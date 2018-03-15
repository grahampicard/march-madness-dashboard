import pandas as pd
import os
import json

def file_loader(path, slot):
    df = pd.read_csv(path + slot)
    df['slot'] = slot.replace('.csv','')
    
    return df


file_loc = "../mmsite/static/scores/"
slots = os.listdir(file_loc)
df = pd.concat(list(map(lambda x: file_loader(file_loc, x), slots)))

df2 = (df.drop_duplicates(subset=['team', 'slot'])
         .set_index(['team', 'slot'])
         .unstack())

df2.columns = df2.columns.map(lambda x: x[1])
df2.to_json(path_or_buf="src/data/loglossScore.json", orient='columns')


schedule = pd.read_csv("./dev/schedule.csv").dropna()
sched = schedule.to_dict(orient='records')
dates = list(set([x['date'] for x in sched]))
final = [{"date": x, "games":[]} for x in dates]

for date in final:
    for game in sched:
        if date['date'] == game['date']:
            date['games'].append(game)

with open("src/data/newGames.json", "w") as f:
    f.write(json.dumps(final, ensure_ascii=True, allow_nan=False))
    f.close()



# export as json
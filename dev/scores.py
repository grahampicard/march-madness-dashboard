import pandas as pd
import os
import json

def file_loader(path, slot):
    df = pd.read_csv(path + slot)
    df['slot'] = slot.replace('.csv','')
    
    return df


file_loc = "..\mmsite\static\scores\\"
slots = os.listdir(file_loc)
df = pd.concat(list(map(lambda x: file_loader(file_loc, x), slots)))

comp_dict = {cur_slot: df[(df.slot == cur_slot)].to_json(orient="records") for cur_slot in df.slot.unique()}

# export as json
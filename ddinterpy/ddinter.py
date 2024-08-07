ATLAS_URI = "mongodb+srv://AnimeAPI:84gF50ZHdlGhBp0p@cluster0.hudmznh.mongodb.net/?retryWrites=true&w=majority"

import pymongo
import csv

# MongoDB setup
client = pymongo.MongoClient(ATLAS_URI)
mydb = client["ddinter_demo"]
mycollection = mydb["interactions"]

# Empty collection
mycollection.delete_many({})

# Create index
mycollection.create_index([("Drug_A", pymongo.ASCENDING), ("Drug_B", pymongo.ASCENDING)], name="interaction_index")

# Insert interaction function
def insert_interaction(batch):
    if batch:
        mycollection.insert_many(batch)

# Read CSV and insert into MongoDB
def read_csv(file_path, batch_size=1000):
    batch = []
    rowNumber = 0
    with open(file_path, newline='') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            rowNumber += 1
            print(f"Inserting row {rowNumber}")
            interaction = {
                "Drug_A": row['Drug_A'],
                "Drug_B": row['Drug_B'],
                "DDInterID_A": row['DDInterID_A'],
                "DDInterID_B": row['DDInterID_B'],
                "Level": row['Level']
            }
            batch.append(interaction)
            if len(batch) >= batch_size:
                insert_interaction(batch)
                batch = []
        if batch:
            insert_interaction(batch)
    print("Data inserted successfully")

# Example usage
read_csv("ddinterpy/ddinter_downloads_code_A.csv")
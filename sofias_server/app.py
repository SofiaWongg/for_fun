from fastapi import FastAPI
from PIL import Image
from sofias_server.client import LocalMemeClient, MemeBaseClient, MattsMemeClient

app = FastAPI()

@app.get("/")
def read_root():
    return  {"Matt": "Sofia"}

@app.get("/items/{item_id}")
def read_item(item_id: int, q: str = None):
    return {"item_id": item_id, "q": q}

@app.get("/request_meme")
def request_meme():
    meme_client = MattsMemeClient()
    meme = meme_client.get_random_meme()
    img = Image.open(meme)
    img.show()
    return {"meme": meme}
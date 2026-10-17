from abc import abstractmethod
import base64
import os
import requests
from datetime import datetime
class MemeBaseClient:
    @abstractmethod
    def get_random_meme(self):
        pass

class LocalMemeClient(MemeBaseClient):
    FOLDER_PATH = "sofias_server/memes"
    MEME_EXTENSION = ".jpeg"
    def get_random_meme(self):
        for file in os.listdir(self.FOLDER_PATH):
            if file.endswith(self.MEME_EXTENSION):
                file_path = os.path.join(self.FOLDER_PATH, file)
                return file_path


class MattsMemeClient(MemeBaseClient):

    def get_random_meme(self):
        response = requests.get("http://localhost:3000/meme")
        response.raise_for_status()
        content_type = response.headers.get("Content-Type", "")
        if not content_type.startswith("image/"):
            raise ValueError(f"Expected an image from meme server, got {content_type!r}")
        # save image in memes folder (server returns PNG bytes)
        timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
        path = f"sofias_server/memes/{timestamp}.png"
        with open(path, "wb") as f:
            f.write(response.content)

        return path
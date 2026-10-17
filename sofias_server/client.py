from abc import abstractmethod
import os

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
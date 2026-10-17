from dataclasses import dataclass

@dataclass
class Car:
    model: str
    color:str

    def get_model(self):
        return self.model
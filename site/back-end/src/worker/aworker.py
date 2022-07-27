class AWorker:
    def __init__(self, url: str):
        self.url = url

    def __call__(self):
        return self

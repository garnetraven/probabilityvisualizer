from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models.user import Base

DATABASE_URL = 'postgresql://username:password@localhost/database_name'
engine = create_engine(DATABASE_URL)
Session = sessionmaker(bind=engine)

def create_tables():
    Base.metadata.create_all(engine)

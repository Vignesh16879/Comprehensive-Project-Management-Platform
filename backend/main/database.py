from django.conf import settings

from pymongo import MongoClient
from bson.objectid import ObjectId
from pandas import DataFrame


class Database:
    def __init__(self):
        CONNECTION_STRING = "mongodb://ipuser:ippassword@192.168.0.150:27017"
        self.CLIENT = MongoClient(CONNECTION_STRING) 
        self.DB = self.ConnectToServer()
    
    
    def ConnectToServer(self):
        DB = self.CLIENT["IPwebsite"]
        
        try:
            print("Database connection attempt...")
        except Exception as e:
            print(f"Database connection error: {e}")
        else:
            print("Database connected!")
        
        return DB
    
    
    def CloseConnection(self):
        print("Database connection Closed!")
        self.CLIENT.close()
    
    
    def RegisterUser(self, user_details):
        try:
            user = {
                "_id" : "user",
                "username" : user_details["username"],
                "first_name" : user_details["firstname"],
                "lastname" : user_details["lastname"],
                "dob" : user_details["dob"],
                "gender" : user_details["gender"],
                "email" : user_details["email"],
                "address1" : user_details["address1"],
                "address2" : user_details["address2"],
                "state" : user_details["state"],
                "city" : user_details["city"],
                "pincode" : user_details["pincode"],
                "country" : user_details["country"],
                "mobile_country" : user_details["mobile1"],
                "mobile_phone" : user_details["mobile2"],
                "profile_image": user_details["profile_image"],
                "isverified" : user_details["isverified"],
                "projects" : []
            }
            
            query = {
                "$or": [
                    {
                        "email" : user_details["email"]
                    }, 
                    {
                        "mobile_country" : user_details["mobile1"],
                        "mobile_phone" : user_details["mobile2"],
                    }
                ]
            }
            
            valid = self.DB.users.find_one( query )
            
            if valid:
                message = {
                    "success" : False,
                    "message" : "User is already registered",
                    "data" : {},
                    "error" : "No error(s) occurred during the process..."
                }
            else:
                self.DB.users.insert_one( user )
                
                message = {
                    "success" : True,
                    "message" : "User registered successfully.",
                    "data" : {},
                    "error" : "No error(s) occurred during the process..."
                }
        except Exception as e:
            message = {
                "success" : False,
                "message" : "Nothing...",
                "data" : {},
                "error" : f"Something went wrong. Error: {e}" 
            }
            
        return message
    
    
    def LoginUser(self, login_details):
        try:
            query = {
                "$or": [
                    {
                        "email" : login_details["username"], 
                        "password" : login_details["password"] 
                    },
                    {
                        "username" : login_details["username"], 
                        "password" : login_details["password"] 
                    }
                ]
            }
            
            user = self.DB.users.find_one( query )
            
            if user:
                message = {
                    "success" : True,
                    "message" : "User Logged in.",
                    "data" : {
                    },
                    "error" : "No error(s) occurred during the process..." 
                }
            else:
                message = {
                    "success" : False,
                    "message" : "Wrong username or password.",
                    "data" : {},
                    "error" : "No error(s) occurred during the process..." 
                }
        except Exception as e:
            message = {
                "success" : False,
                "message" : "Nothing...",
                "data" : {},
                "error" : f"Something went wrong. Error: {e}" 
            }
            
        return message

    
    def RegisterProject(self, project_details):
        try:
            project = {
                "_id" : "project",
                "title" : project_details["title"],
                "description" : project_details["description"],
                "created_at" : datetime.now(),
                "updated_at" : datetime.now(),
                "created_by" : project_details["created_by"],
                "updated_by" : project_details["updated_by"],
                "status" : "active",
                "visibility" : projects_details["visibility"],
                "tasks" : [],
                "pending_tasks" : [],
                "members" : [],
                "labels" : [],
                "files" : [],
                "comments" : [],
                "history" : [],
                "settings" : {},
                "permissions" : {},
                "tags" : [],
                "budget" : [],
                "temp_members" : [],
                "invited_members" : []
            }
            
            self.DB.projects.insert_one( project )
            
            message = {
                "success" : True,
                "message" : "Project registered successfully.",
                "data" : {},
                "error" : "No error(s) occurred during the process..."
            }
        except Exception as e:
            message = {
                "success" : False,
                "message" : "Nothing...",
                "data" : {},
                "error" : f"Something went wrong. Error: {e}" 
            }
            
        return message
    
    
    def GetProjects(self):
        try:
            projects = list(self.DB.projects.find())
            
            for project in projects:
                project['_id'] = str(project['_id']) 

            message = {
                "success": True,
                "message": "Projects fetched successfully.",
                "data": projects,
                "error": "No error(s) occurred during the process..."
            }
            
        except Exception as e:
            message = {
                "success" : False,
                "message" : "Nothing...",
                "data" : {},
                "error" : f"Something went wrong. Error: {e}" 
            }
            
        return message
    
    
    def GetProject(self, idx):
        try:
            query = {
                "_id" : ObjectId(idx)
            }
            
            project = self.DB.projects.find_one( query )
            
            if project:
                message = {
                    "success" : True,
                    "message" : "Project Details retrieved",
                    "data" : {
                        'project' : project
                    },
                    "error" : "No error(s) occurred during the process..." 
                }
            else:
                message = {
                    "success" : False,
                    "message" : "Unable to retrieve project details.",
                    "data" : {},
                    "error" : "No error(s) occurred during the process..." 
                }
        except Exception as e:
            message = {
                "success" : False,
                "message" : "Nothing...",
                "data" : {},
                "error" : f"Something went wrong. Error: {e}" 
            }
            
        return message

    
    def JoinProject(self, project_id, user_id):
        try:
            query1 = {
                "_id" : ObjectId(project_id)
            }
            
            query2 = {
                "_id": ObjectId(user_id)
            }
            
            res1 = self.DB.projects.find_one( query1 )
            res2 = self.DB.users.find_one( query2 )
            
            if res1 and res2:
                filter = {
                    "_id" : ObjectId(project_id)
                }
                
                value = {
                    "$set" : {
                        "temp_members" : res1["temp_members"].append(user_id)
                    }
                }
                
                check = self.DB.projects.update_one(filter, value)
                
                if value:
                    message = {
                        "success" : True,
                        "message" : "Project invite is in process. Wait for project host to accept the invite",
                        "data" : {},
                        "error" : "No error(s) occurred during the process..." 
                    }
                else:
                    message = {
                        "success" : False,
                        "message" : "Unable to join the project.",
                        "data" : {},
                        "error" : f"Something went wrong." 
                    }
            else:
                message = {
                    "success" : False,
                    "message" : "Unable to verify user or project in the database.",
                    "data" : {},
                    "error" : "No error(s) occurred during the process..." 
                }            
        except Exception as e:
            message = {
                "success" : False,
                "message" : "Nothing...",
                "data" : {},
                "error" : f"Something went wrong. Error: {e}" 
            }
            
        return message
    
    
    def LeaveProject(self, project_id, user_id):
        try:
            query1 = {
                "_id" : ObjectId(project_id)
            }
            
            query2 = {
                "_id": ObjectId(user_id)
            }
            
            res1 = self.DB.projects.find_one( query1 )
            res2 = self.DB.users.find_one( query2 )
            
            if res1 and res2:
                filter = {
                    "_id" : ObjectId(project_id)
                }
                
                value = {
                    "$set" : {
                        "temp_members" : res1["temp_members"].remove(user_id)
                    }
                }
                
                check = self.DB.projects.update_one(filter, value)
                
                if value:
                    message = {
                        "success" : True,
                        "message" : "You have left the project. You are no longer part of this project.",
                        "data" : {},
                        "error" : "No error(s) occurred during the process..." 
                    }
                else:
                    message = {
                        "success" : False,
                        "message" : "Unable to leave the project.",
                        "data" : {},
                        "error" : f"Something went wrong." 
                    }
            else:
                message = {
                    "success" : False,
                    "message" : "Unable to verify user or project in the database.",
                    "data" : {},
                    "error" : "No error(s) occurred during the process..." 
                }            
        except Exception as e:
            message = {
                "success" : False,
                "message" : "Nothing...",
                "data" : {},
                "error" : f"Something went wrong. Error: {e}" 
            }
            
        return message
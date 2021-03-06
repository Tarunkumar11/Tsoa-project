import { Body, Controller, Get, Path, Post, Query, Route,SuccessResponse } from "tsoa";
import { User } from "./user";
import { UsersService, UserCreationParams } from "./usersService";
  
@Route("users")
export class UsersController extends Controller {
    
    
    @Get("{userId}")
    public async getUser( @Path() userId: number, @Query() name?: string, @Query() email?:string): Promise<User> {
      console.log("name: ", name, "email: ", email)
      return new UsersService().get(userId, name, email);
    }
  
    @SuccessResponse("201", "Created") // Custom success response
    @Post()
    public async createUser( @Body() requestBody: UserCreationParams): Promise<void> {
      this.setStatus(201); // set return status 201
      new UsersService().create(requestBody);
      return;
    }
}
import { Controller, Get, Post, Body, Param, ParseUUIDPipe, HttpCode, HttpStatus } from "@nestjs/common";
import { UserService } from "../service/user.service.js";
import { CreateUserDto } from "../dto/create-user.dto.js";
import { UserResponseDto } from "../dto/user-response.dto.js";

@Controller("users")
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post()
	@HttpCode(HttpStatus.CREATED)
	async create(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
		return this.userService.create(createUserDto);
	}

	@Get()
	async findAll(): Promise<UserResponseDto[]> {
		return this.userService.findAll();
	}

	@Get(":id")
	async findOne(@Param("id", ParseUUIDPipe) id: string): Promise<UserResponseDto> {
		return this.userService.findById(id);
	}
}

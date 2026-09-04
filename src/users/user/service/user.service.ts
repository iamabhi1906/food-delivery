import { Injectable, NotFoundException, ConflictException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserEntity } from "../../identity/entity/user.entity.js";
import { CreateUserDto } from "../dto/create-user.dto.js";
import { UserResponseDto } from "../dto/user-response.dto.js";

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(UserEntity, "users")
		private readonly userRepository: Repository<UserEntity>,
	) {}

	async create(dto: CreateUserDto): Promise<UserResponseDto> {
		const existing = await this.userRepository.findOne({
			where: { email: dto.email },
		});
		if (existing) {
			throw new ConflictException(`User with email ${dto.email} already exists`);
		}

		const user = this.userRepository.create({
			email: dto.email,
			name: dto.name,
		});

		const saved = await this.userRepository.save(user);
		return this.mapToResponse(saved);
	}

	async findAll(): Promise<UserResponseDto[]> {
		const users = await this.userRepository.find();
		return users.map((u) => this.mapToResponse(u));
	}

	async findById(id: string): Promise<UserResponseDto> {
		const user = await this.userRepository.findOne({ where: { id } });
		if (!user) {
			throw new NotFoundException(`User with ID ${id} not found`);
		}
		return this.mapToResponse(user);
	}

	async findByEmail(email: string): Promise<UserResponseDto | null> {
		const user = await this.userRepository.findOne({ where: { email } });
		if (!user) return null;
		return this.mapToResponse(user);
	}

	private mapToResponse(entity: UserEntity): UserResponseDto {
		return {
			id: entity.id,
			email: entity.email,
			name: entity.name,
			createdAt: entity.createdAt,
			updatedAt: entity.updatedAt,
		};
	}
}

using AutoMapper;
using FruitsShopBackend.Data;
using FruitsShopBackend.Dtos;
using FruitsShopBackend.Interfaces.IRepositories;
using FruitsShopBackend.Interfaces.IServices;
using FruitsShopBackend.Model;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FruitsShopBackend.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly ICloudinaryService _cloudinaryService;
        private readonly IMapper _mapper;
        private readonly MongoDbContext _context;
        private readonly PasswordHasher<User> _passwordHasher;

        public UserService(IUserRepository userRepository, ICloudinaryService cloudinaryService, IMapper mapper, MongoDbContext context)
        {
            _userRepository = userRepository;
            _cloudinaryService = cloudinaryService;
            _mapper = mapper;
            _passwordHasher = new PasswordHasher<User>();
            _context = context;
        }

        public async Task<UserDto> GetUserById(string userId)
        {
            var user = await _userRepository.GetUserById(userId);
            return _mapper.Map<UserDto>(user);
        }

        public async Task<List<UserDto>> GetAllUsers()
        {
            var users = await _userRepository.GetAllUsers();
            return _mapper.Map<List<UserDto>>(users);
        }

        public async Task<UserDto> CreateUser(UserCreateDto userDto)
        {
            // Determine isSeller based on RoleType
            bool isSeller = userDto.Role == Constants.RoleType.Seller;
            // Hash the password
            var passwordHash = _passwordHasher.HashPassword(null, userDto.Password);

            // Map DTO to Model
            var user = new User
            {
                FirstName = userDto.FirstName,
                LastName = userDto.LastName,
                Email = userDto.Email,
                DoB = userDto.DoB,
                PhoneNumber = userDto.PhoneNumber,
                PasswordHash = passwordHash,
                Role = userDto.Role,
                IsSeller = isSeller,
                // Map other properties as needed
            };

            // Optionally handle image upload to Cloudinary
            if (userDto.Image != null)
            {
                var cloudinaryResult = await _cloudinaryService.UploadImageAsync(userDto.Image);
                user.ImageId = cloudinaryResult.ImageId;
                user.ImageUserPath = cloudinaryResult.ImagePath;
                // Optionally, you can update CloudImage collection as well if needed
                var cloudImage = new CloudImage
                {
                    ImageId = cloudinaryResult.ImageId,
                    ImagePath = cloudinaryResult.ImagePath
                };
                await _context.CloudImages.InsertOneAsync(cloudImage);
            }

            await _userRepository.CreateUser(user);
            return _mapper.Map<UserDto>(user);
        }

        public async Task<UserDto> UpdateUser(string userId, UserUpdateDto userDto)
        {
            // Determine isSeller based on RoleType
            bool isSeller = userDto.Role == Constants.RoleType.Seller;
            var existingUser = await _userRepository.GetUserById(userId);
            if (existingUser == null)
            {
                // Handle case where user with given ID is not found
                return null;
            }

            // Map DTO updates to Model
            _mapper.Map(userDto, existingUser);

            // Set isSeller based on RoleType
            existingUser.IsSeller = isSeller;
            // Optionally handle image upload to Cloudinary
            if (userDto.Image != null)
            {
                var cloudinaryResult = await _cloudinaryService.UploadImageAsync(userDto.Image);
                existingUser.ImageId = cloudinaryResult.ImageId;
                existingUser.ImageUserPath = cloudinaryResult.ImagePath;

                var cloudImage = new CloudImage
                {
                    ImageId = cloudinaryResult.ImageId,
                    ImagePath = cloudinaryResult.ImagePath
                };
            }

            await _userRepository.UpdateUser(existingUser);
            return _mapper.Map<UserDto>(existingUser);
        }

        public async Task DeleteUser(string userId)
        {
            var user = await _userRepository.GetUserById(userId);
            if (user == null)
            {
                // Handle case where user with given ID is not found
                return;
            }

            await _userRepository.DeleteUser(user);
        }
    }
}

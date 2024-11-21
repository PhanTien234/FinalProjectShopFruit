using AutoMapper;
using FruitsShopBackend.Dtos;
using FruitsShopBackend.Interfaces.IRepositories;
using FruitsShopBackend.Interfaces.IServices;
using FruitsShopBackend.Model;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;

namespace FruitsShopBackend.Services
{
    public class PaymentMethodService : IPaymentMethodService
    {
        private readonly IPaymentMethodRepository _paymentMethodRepository;
        private readonly IMapper _mapper;

        public PaymentMethodService(IPaymentMethodRepository paymentMethodRepository, IMapper mapper)
        {
            _paymentMethodRepository = paymentMethodRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<PaymentMethodDto>> GetAllPaymentMethods()
        {
            var paymentMethods = await _paymentMethodRepository.GetAllPaymentMethods();
            return _mapper.Map<IEnumerable<PaymentMethodDto>>(paymentMethods);
        }

        public async Task<PaymentMethodDto> GetPaymentMethodById(string id)
        {
            var paymentMethod = await _paymentMethodRepository.GetPaymentMethodById(id);
            return _mapper.Map<PaymentMethodDto>(paymentMethod);
        }

        public async Task<PaymentMethodDto> CreatePaymentMethod(PaymentMethodCreateUpdateDto paymentMethodDto)
        {
            var paymentMethod = _mapper.Map<PaymentMethod>(paymentMethodDto);
            paymentMethod.CreatedAt = DateTime.UtcNow;

            var createdPaymentMethod = await _paymentMethodRepository.CreatePaymentMethod(paymentMethod);
            return _mapper.Map<PaymentMethodDto>(createdPaymentMethod);
        }

        public async Task UpdatePaymentMethod(string id, PaymentMethodCreateUpdateDto paymentMethodDto)
        {
            var paymentMethod = _mapper.Map<PaymentMethod>(paymentMethodDto);
            await _paymentMethodRepository.UpdatePaymentMethod(id, paymentMethod);
        }

        public async Task DeletePaymentMethod(string id)
        {
            await _paymentMethodRepository.DeletePaymentMethod(id);
        }
    }
}

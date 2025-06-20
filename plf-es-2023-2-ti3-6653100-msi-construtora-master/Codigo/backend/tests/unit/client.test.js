test('Deve criar um cliente corretamente', () => {
    const cliente = {
        nome: 'João Silva',
        cpf: '123.456.789-00'
    };

    expect(cliente.nome).toBe('João Silva');
    expect(cliente.cpf).toMatch(/\d{3}\.\d{3}\.\d{3}-\d{2}/);
});

test('Deve criar um fornecedor corretamente', () => {
    const fornecedor = {
        nome: 'Construtora ABC',
        cnpj: '12.345.678/0001-99'
    };

    expect(fornecedor.nome).toBe('Construtora ABC');
    expect(fornecedor.cnpj).toMatch(/\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}/);
});

test('Deve criar uma obra corretamente', () => {
    const obra = {
        nome: 'Obra Centro',
        endereco: 'Rua das Flores, 123'
    };

    expect(obra.nome).toBe('Obra Centro');
    expect(obra.endereco).toContain('Rua');
});

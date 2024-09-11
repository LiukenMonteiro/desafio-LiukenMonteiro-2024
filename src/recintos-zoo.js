class RecintosZoo {

    constructor() {
        this.recintos = [
            { numero: 1, bioma: 'savana', tamanho: 10, animais: [{especie: 'MACACO', quantidade: 3}] },
            { numero: 2, bioma: 'floresta', tamanho: 5, animais: [] },
            { numero: 3, bioma: 'savana e rio', tamanho: 7, animais: [{ especie: 'GAZELA', quantidade: 1 }] },
            { numero: 4, bioma: 'rio', tamanho: 8, animais: [] },
            { numero: 5, bioma: 'savana', tamanho: 9, animais: [{ especie: 'LEAO', quantidade: 1 }] }
        ];
        
        this.animais = {
            LEAO: { tamanho: 3, biomas: ['savana'], carnivoro: true },
            LEOPARDO: { tamanho: 2, biomas: ['savana'], carnivoro: true },
            CROCODILO: { tamanho: 3, biomas: ['rio'], carnivoro: true },
            MACACO: { tamanho: 1, biomas: ['savana', 'savana e rio', 'floresta'], carnivoro: false },
            GAZELA: { tamanho: 2, biomas: ['savana'], carnivoro: false },
            HIPOPOTAMO: { tamanho: 4, biomas: ['savana', 'rio', 'savana e rio'], carnivoro: false }
        };
    }


    analisaRecintos(animal, quantidade) { 
        // Validar o animal
        if (!this.animais[animal]) {
            return { erro: "Animal inválido", recintosViaveis: null };
        }
        // Validar a quantidade
        if (quantidade <= 0) {
            return { erro: "Quantidade inválida", recintosViaveis: null };
        }

        const especie = this.animais[animal];
        const recintosViaveis = [];

        for (let recinto of this.recintos) {
            let espacoOcupado = 0;
            let carnivoroPresente = false;
            let outrasEspecies = 0;

            for (let animalExiste of recinto.animais) {
                const especieExiste = this.animais[animalExiste.especie];
                espacoOcupado += animalExiste.quantidade * especieExiste.tamanho;

                // Verificar se há carnívoros no recinto
                if (especieExiste.carnivoro) {
                    carnivoroPresente = true;
                }
                // Verificar se há outras espécies
                if (animalExiste.especie !== animal) {
                    outrasEspecies++;
                }
            }

            // carnivoro presente? herbivoro não pode ficar junto "resolvendo o problema do macaco"
            if (carnivoroPresente && !especie.carnivoro) {
                continue; // proximo recinto
            }

            // Verificar se o animal pode habitar o bioma do recinto
            if (especie.biomas.includes(recinto.bioma)) {
                // Calcular o espaço necessário
                const espacoNecessario = quantidade * especie.tamanho + (outrasEspecies > 0 ? 1 : 0);

                // Verificar se há espaço disponível no recinto
                if (recinto.tamanho - espacoOcupado >= espacoNecessario) {
                    recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${recinto.tamanho - espacoOcupado - espacoNecessario} total: ${recinto.tamanho})`);
                }
            }
        }

        if (recintosViaveis.length === 0) {
            return { erro: "Não há recinto viável", recintosViaveis: null }; 
        }
        return { erro: null, recintosViaveis };
    }
}

// Testando o código
const zoo = new RecintosZoo();
const resultado = zoo.analisaRecintos('MACACO', 2);
console.log(resultado);

export { RecintosZoo as RecintosZoo };

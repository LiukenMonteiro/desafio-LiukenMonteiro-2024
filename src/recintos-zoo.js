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
            MACACO: { tamanho: 3, biomas: ['savana', 'floresta'], carnivoro: false },
            GAZELA: { tamanho: 3, biomas: ['savana'], carnivoro: false },
            HIPOPOTAMO: { tamanho: 3, biomas: ['savana', 'rio'], carnivoro: false }
        };
    }


    analisaRecintos(animal, quantidade) { 
        //vamos verificar a validade do animal.
        if (!this.animais[animal]) {
            return { erro: "Animal inválido", recintosViaveis: null };
        }
        //vamos verificar se a quantidade do animal é válida.
        if (quantidade <= 0) {
            return { erro: "Quantidade inválida", recintosViaveis: null };
        }
        const especie = this.animais[animal];

        const recintosViaveis = [];

        for (let recinto of this.recintos) {
            let espacoOcupado = 0;
            let carnivoroPresente = false;
            let outrasEspecies = 0;
            //vamos verificar se o recinto é compatível com o animal.
            // if (recinto.bioma === especie.biomas[0] && recinto.tamanho >= quantidade * especie.tamanho) {
            //     recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${recinto.tamanho - quantidade * especie.tamanho} total: ${recinto.tamanho})`);
            // }

            for ( let animalExiste of recinto.animais) {
                const especieExiste = this.animais[animalExiste.especie];
                espacoOcupado += animalExiste.quantidade * especieExiste.tamanho;

                //verificando se é carnívoro
                if (especieExiste.carnivoro) {
                    carnivoroPresente = true;
                }
                //verificando se é de outra espécie
                if (animalExiste.especie !== animal) {
                    outrasEspecies += animalExiste.quantidade;
                }
            }
        }
    }

}

export { RecintosZoo as RecintosZoo };

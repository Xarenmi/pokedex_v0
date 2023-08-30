/* My fav Pokemons */

class Pokemon {
    static pokemons = [];

    constructor(id, name, kind, height, weight, description) {
        this.id = id;
        this.name = name;
        this.kind = kind;
        this.region = '';
        this.height = height;
        this.weight = weight;
        this.description = description;
        this.forms = [];
        this.pic = ''
        this.skills = '';
        Pokemon.pokemons.push(this);
        this.setRegion();
    }

    setRegion() {
        this.id < 152 ? this.region = 'Kanto' : this.id > 151 && this.id < 252 ? this.region = 'Johto' : this.id > 251 && this.id < 385 ? this.region = 'Hoenn' : this.id > 384 && this.id < 485 ? this.region = 'Sinoh' : this.id > 484 && this.id < 650 ? this.region = 'Unova' : this.id > 649 && this.id < 722 ? this.region = 'Kalos' : this.id === 808 || this.id === 809 ? this.region = 'unknow' : this.id > 721 && this.id < 819 ? this.region = 'Alola' : this.id > 818 && this.id < 899 ? this.region = 'Galar' : this.id > 898 ? this.region = 'Hisui' : null;
    }

    /* setSkill(){} */

    static findPokemon(idNumber) {
        return Pokemon.pokemons.find(pokemon => pokemon.id === idNumber);
    }

    static getPokemons() {
        return Pokemon.pokemons;
    }

    static removePokemon(pokemon) {
        const index = Pokemon.pokemons.indexOf(pokemon)
        if (index !== -1) {
            Pokemon.pokemons.splice(index, 1)
        }

        Pokemon.pokemons.forEach(poke => {
            poke.forms = poke.forms.filter(form => form !== pokemon);
        });
    }

    addForm(pokemon) {
        if(this.forms.length > 0){
            this.forms.forEach(form => {
                form.forms.push(pokemon)
                pokemon.forms.push(form)
            })
        }
        this.forms.push(pokemon)
        pokemon.forms.push(this)
    }
}

class Region {
    static regions = []

    constructor(name, description){
        this.name = name
        this.description = description
        this.map = ''
        this.pokemons = []
        this.setPokemons()
        Region.regions.push(this)
    }

    setPokemons(){
        Pokemon.pokemons.forEach(pokemon => {
            if (pokemon.region === this.name){
                this.pokemons.push(pokemon)
                pokemon.region = this
            }
        })
    }
}

const bulbasaur = new Pokemon(1, 'Bulbasaur', 'Planta', '0.7m', '6.9kg', 'Bulbasaur puede ser encontrado tomando siestas bajo el sol. Hay una semilla en su espalda. Al darse baños de sol, la semilla va creciendo más y más grande.')
const ivysaur = new Pokemon(2, 'Ivysaur', 'Planta', '1m', '13kg', 'Hay un capullo en la espalda de este pokemon. El tronco y piernas de Ivysaur son gruesas y fuertes. Si comienza a pasar más tiempo bajo el sol, es señal de que el capullo florecerá pronto.')
const venusaur = new Pokemon(3, 'Venusaur', 'Planta', '2m', '100kg', 'Hay una gran flor en la espalda de Venusaur. Se dice que la flor es de colores vívidos si obtiene suficiente nutrición y luz solar. El olor de esa flor, sirve para calmar las emociones de las personas.' )

venusaur.addForm(ivysaur)
ivysaur.addForm(bulbasaur)

const pichu = new Pokemon(172, 'Pichu', 'Eléctrico', '0.3m', '2kg', 'Pichu se carga a si mismo con electricidad más facilmente en días nublados o aquellos en que el aire es muy seco. Puedes escuchar el crujir de la energía estática que emite este pokemon.')
const pikachu = new Pokemon(25, 'Pikachu', 'Eléctrico', '0.4m', '6kg', 'Siempre que Pikachu se encuentra con algo novedoso, estalla con un una sacudida eléctrica. Si te encuentras algo similar a una pasa quemada, probablemente se excedió un poco.')
const raichu = new Pokemon(26,'Raichu', 'Eléctrico', '0.8m', '30kg', 'Si sus sacos eléctricos se cargan en exceso, Raichu coloca su cola en el suelo y descarga. Pedazos de tierra chamuscada serán encontrados cerca del nido de este pokemon.' )

raichu.addForm(pikachu)
pikachu.addForm(pichu)

const litwick = new Pokemon(607, 'Litwick', 'Fantasma', '0.3m', '3.1kg', 'Litwick ilumina con una luz que absorbe la energía vital de las personas y los pokemon, y la convierte en la energía que arde en su llama.')
const lampent = new Pokemon(608, 'Lampent', 'Fantasma', '0.6m', '13kg', 'Aparece cercano al momento de la muerte y se roba el espíritu los cuerpos.')
const chandelure = new Pokemon(609, 'Chandelure', 'Fantasma', '1m', '34.3kg', 'Los espíiritus que se queman en su siniestro fuego, pierden su camino y deambúlan este mundo por la eternidad.')

chandelure.addForm(lampent)
lampent.addForm(litwick)

const piplup = new Pokemon(393, 'Piplup', 'Agua', '0.4m', '5.2kg', 'Como es muy orgullozo, le molesta aceptar comida de extraños. Su capa gruesa lo resguarda del frío.')
const prinplup = new Pokemon(394, 'Prinplup', 'Agua', '0.8m', '23kg', 'Vive en solitario. Sus alas realizan aleteos tan certeros que pueden cortar el más grueso de los árboles.')
const empoleon  = new Pokemon(394, 'Empoleon', 'Agua', '1.7m', '84.5kg', 'Los tres cuernos que parten de su pico son evidencias de su poder. El lider será quien tenga los cuernos más grandes.')

empoleon.addForm(prinplup)
prinplup.addForm(piplup)

const alolanVulpix = new Pokemon (753, 'Vulpix', 'Hielo', '0.6m', '9.9kg', 'En el momento en que nace, Vulpix tiene una cola blanca. La cola se separa en seis si recibe bastante cariño de su entrenador. Sus seis colas se enroscan magnificentes.')
const alolanNinetales = new Pokemon (754, 'Alolan Ninetales', 'Hielo', '1.1m', '19.9kg', 'Version ada/hielo de la region Alola. Ninetales lanza una luz siniestra a traves de sus ojos para ganar control total de su enemigo. Se rumora que viven hasta 1000 años.')

alolanNinetales.addForm(alolanVulpix)

const mimikyu = new Pokemon (778, 'Mimikyu', 'Hada', '0.2m', '0.7kg', 'Vive toda su vida oculto bajo su saco con garabatos dibujados en él pero al atacar saca su garra por debajo de esta. Cuentan que si alguien viera su aspecto real, sería  víctima de una rara enfermedad.')

mimikyu.forms.push('None')

const gastly = new Pokemon (92, 'Gastly', 'Fantasma', '1.3m', '0.1kg', 'Gastly está mayormente compuesto de materia gaseosa. Cuando hay vientos fuertes, su cuerpo gaseoso se dispersa y desaparece. Montones de estos pokemon se acumulan bajo los tejados para escapar del viento.')
const haunter = new Pokemon (93, 'Haunter', 'Fantasma', '1.6m', '0.1kg', 'Es un pokemon peligroso. Si alguno te reconoce mientras flota en la oscuridad, no te le acerques. Este pokemon intentará lamente y robar tu vida.' )
const gengar = new Pokemon (94, 'Gengar', 'Fantasma', '1.81m', '40.5kg', 'En ocasiones, durante una noche oscura, la sombre que proyectas gracias a las luces de la calle podría comenzar a agitarse y derrumbarte repentinamente. Seguramente se trata de un Gengar pretendiendo ser tu sombra.')

gengar.addForm(haunter)
haunter.addForm(gastly)

const mawile = new Pokemon (303, 'Mawile', 'Hierro', '0.6m', '11.5kg', 'Los colmillos afilados de Mawile son en realidad picos de acero. Su rostro amable sirve para engañar a su enemigo y que baje su guardia. Cuando el oponente menos lo espera, Mawile lanza una mordida.')

mawile.forms.push('None')

/* 
const eevee = new Pokemon('Eevee')
const jigglypuff = new Pokemon('Jigglypuff')
const pumpkaboo = new Pokemon ('Pumpkaboo')
const larvitar = new Pokemon ('Larvitar ')
const swirlix = new Pokemon ('Swirlix')
const slurpuff = new Pokemon('Slurpuff')
Groudon, Kyogre y Rayquaza */



const Kanto = new Region ('Kanto', 'Es una región del mundo Pokémon situada al este de Johto y al sur de Sinnoh. Su paisaje está inspirado en la zona de Japón del mismo nombre, la región de Kantō.')
const Johto = new Region ('Johto', 'Es una región del mundo Pokémon situada al oeste de Kanto. Su paisaje está inspirado en la zona de Japón llamada región de Kinki y el oeste de la región de Tōkai.')
const Hoenn = new Region ('Hoenn', 'Es la región del mundo Pokémon donde se desarrolla la historia de los videojuegos Pokémon Rubí, Zafiro y Esmeralda, así como sus remakes. También es hogar de «el trío creador»: los Pokémon legendarios Groudon, Kyogre y Rayquaza.')
const Sinoh = new Region ('Sinoh', 'Está ubicada al norte de las regiones de Kanto, Johto y Hoenn. En ella se desarrollan los videojuegos Pokémon Diamante, Pokémon Perla y Pokémon Platino, al igual que sus remakes. Es importante mencionar que anteriormente esta región era conocida como Hisui.')
const Unova = new Region ('Unova', 'En principio, parece estar más lejos que cualquier otra región. Con respecto a las demás regiones del mundo Pokémon, hay ciudades mucho más modernas. Los nombres de los lugares se refieren a los materiales y los procesos de la cerámica: Pueblo Arcilla, Ciudad Porcelana, Ciudad Teja, Bosque Azulejo, etc.')
const Kalos = new Region ('Kalos', 'La región está basada en Francia y Ciudad Luminalia, en París, lo que se aprecia sobre todo en la Torre Prisma, monumento semejante a la Torre Eiffel. Kalos presenta la mayor población de cualquier región, así como la variedad más amplia de especies Pokémon, que proceden de todo el mundo.')
const Alola = new Region ('Alola', 'Se trata de un archipiélago compuesto por cuatro islas naturales: Melemele, Akala, Ula-Ula, y Poni, cuenta además con una isla artificial: el Paraíso Æther. En esta región se desarrollan los juegos de la séptima generación Pokémon Sol, Luna, Ultrasol y Ultraluna. La región está basada en Hawái.')
const Galar = new Region ('Galar', 'En Galar se observan ciudades grandes con prominente arquitectura clásica de ladrillos, entre otros estilos, así como una enorme ciudad más moderna en la zona norte de la región, sobre unas montañas nevadas. Humanos y Pokémon viven juntos en esta región y trabajan codo con codo para desarrollar su industria. Se basa en Reino Unido.')
const Hisui = new Region ('Hisui', 'Es el nombre que recibía la región de Sinnoh en la época en la que los primeros asentamientos de humanos tuvieron lugar. En ella se desarrolla Leyendas Pokémon: Arceus.')






export { Pokemon, Region };
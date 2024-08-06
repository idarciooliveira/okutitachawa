

export function TranslateAnimalType(type: string){
     switch (type) {
        case 'goats':
            return 'Cabras'
        case 'pigs':
            return 'Suínos'
        case 'cows': 
            return 'Bovinos'
        default:
            break;
    }
}
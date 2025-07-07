import { RaceTypeStrategy, WinnerTypes } from '@/types/scraped.type';

export const raceTypeStrategy: Record<WinnerTypes, RaceTypeStrategy> = {
    'SR WINNER': {
        returnType() {
            return 'Sprint';
        }
    },
    'FR WINNER': {
        returnType() {
            return 'Main Race';
        }
    },
    'SR1 WINNER': {
        returnType() {
            return 'Sprint 1';
        }
    },
    'SR2 WINNER': {
        returnType() {
            return 'Sprint 2';
        }
    }
};

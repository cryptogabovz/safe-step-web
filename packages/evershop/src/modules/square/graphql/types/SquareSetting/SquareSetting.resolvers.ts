import { getSquareConfig } from '../../../services/squareConfig.js';

interface SettingRow {
  name: string;
  value: string;
}

const find = (setting: SettingRow[], name: string) =>
  setting.find((s) => s.name === name);

export default {
  Setting: {
    // Activación y datos no secretos viven en la tabla `setting` (editables en el admin).
    squarePaymentStatus: (setting: SettingRow[]) => {
      const s = find(setting, 'squarePaymentStatus');
      return s ? parseInt(s.value, 10) : 0;
    },
    squareDisplayName: (setting: SettingRow[]) => {
      const s = find(setting, 'squareDisplayName');
      return s ? s.value : 'Square';
    },
    squarePaymentMode: (setting: SettingRow[]) => {
      const s = find(setting, 'squarePaymentMode');
      return s ? s.value : 'capture';
    },
    // IDs públicos y environment: SIEMPRE desde variables de entorno (nunca BD).
    squareApplicationId: () => getSquareConfig().applicationId || null,
    squareLocationId: () => getSquareConfig().locationId || null,
    squareEnvironment: () => getSquareConfig().environment
  }
};

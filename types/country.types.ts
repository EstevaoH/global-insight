/**
 * Tipos para a API IBGE Países
 * Referência: https://servicodados.ibge.gov.br/api/docs/paises
 * Endpoint: GET /api/v1/paises/{paises}
 */

export interface CountryId {
  M49: number;
  'ISO-3166-1-ALPHA-2': string;
  'ISO-3166-1-ALPHA-3': string;
}

export interface CountryName {
  abreviado: string;
  'abreviado-EN': string;
  'abreviado-ES': string;
}

export interface AreaUnit {
  nome: string;
  símbolo: string;
  multiplicador: number;
}

export interface CountryArea {
  total: string;
  unidade: AreaUnit;
}

export interface Region {
  id: { M49: number };
  nome: string;
}

export interface CountryLocation {
  regiao: Region;
  'sub-regiao': Region;
  'regiao-intermediaria'?: Region;
}

export interface Language {
  id: {
    'ISO-639-1': string;
    'ISO-639-2': string;
  };
  nome: string;
}

export interface Government {
  capital: {
    nome: string;
  };
}

export interface Currency {
  id: {
    'ISO-4217-ALPHA': string;
    'ISO-4217-NUMERICO': string;
  };
  nome: string;
}

/**
 * Perfil completo de um país retornado pela API IBGE.
 * Exemplo: GET /api/v1/paises/BR
 */
export interface IbgeCountry {
  id: CountryId;
  nome: CountryName;
  area: CountryArea;
  localizacao: CountryLocation;
  linguas: Language[];
  governo: Government;
  'unidades-monetarias': Currency[];
  historico?: string;
}

/**
 * Versão simplificada usada na UI.
 */
export interface Country {
  /** Código ISO 3166-1 Alpha-2 (ex: "BR") */
  code: string;
  /** Código ISO 3166-1 Alpha-3 (ex: "BRA") */
  code3: string;
  /** M49 numérico (ex: 76) */
  m49: number;
  /** Nome abreviado em PT */
  name: string;
  /** Nome em inglês */
  nameEN: string;
  /** Continente (ex: "América") */
  region: string;
  /** Sub-região (ex: "América Latina e Caribe") */
  subRegion: string;
  /** Capital */
  capital: string;
  /** Área em km² */
  areaTotalKm2: number;
  /** Idiomas oficiais */
  languages: string[];
  /** Códigos ISO-639-1 dos idiomas oficiais */
  languageCodes?: string[];
  /** Moedas */
  currencies: string[];
  /** Histórico descritivo */
  history?: string;
}

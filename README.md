# Finanzas Mobile

Esta carpeta contiene un prototipo simple de una app de finanzas personales hecha con React Native (Expo). Incluye formularios para registrar ingresos, deudas y gastos diarios, genera un balance disponible y muestra un grafico de torta con `react-native-chart-kit`.

## Instalación

1. Instala [Expo CLI](https://docs.expo.dev/get-started/installation/) si aún no la tienes:

```bash
npm install -g expo-cli
```

2. Descarga las dependencias del proyecto:

```bash
npm install
```

3. Inicia el servidor de desarrollo:

```bash
npm start
```

El punto de entrada de la app es `index.js`, que registra el componente `App`.

## Scripts disponibles

```bash
npm start       # inicia el servidor de desarrollo de Expo
npm android     # ejecuta en un emulador Android conectado
npm ios         # ejecuta en un emulador iOS conectado
npm web         # ejecuta la versión web
```

Se requieren las dependencias indicadas en `package.json`. Al ser un prototipo básico no incluye persistencia ni estilos avanzados.

Si la instalación de dependencias falla con un mensaje `ETARGET` o similar, verifica que la versión de cada paquete exista o ajusta la versión manualmente en `package.json`.

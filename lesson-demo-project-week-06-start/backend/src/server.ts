import app from './app';
import { config } from './config/config';

app.listen(config.APP_PORT, () => {
  console.log(`Backend API is running on PORT ${config.APP_PORT}`)
})

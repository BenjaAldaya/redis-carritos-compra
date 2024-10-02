const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const BACKUP_DIR = path.join(__dirname, 'backups');

// Asegúrate de que el directorio de respaldo existe
if (!fs.existsSync(BACKUP_DIR)){
    fs.mkdirSync(BACKUP_DIR);
}

const backupFilename = `redis-backup-${new Date().toISOString().replace(/[:.]/g, '-')}.rdb`;
const backupPath = path.join(BACKUP_DIR, backupFilename);

// Ejecuta el comando SAVE de Redis
exec('redis-cli SAVE', (error, stdout, stderr) => {
    if (error) {
        console.error(`Error al ejecutar SAVE: ${error}`);
        return;
    }
    console.log('Redis SAVE ejecutado exitosamente');

    // Copia el archivo dump.rdb al directorio de respaldo
    fs.copyFile('/var/lib/redis/dump.rdb', backupPath, (err) => {
        if (err) {
            console.error(`Error al copiar el archivo de respaldo: ${err}`);
        } else {
            console.log(`Respaldo creado exitosamente: ${backupPath}`);
        }
    });
});

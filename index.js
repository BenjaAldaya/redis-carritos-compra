import { createClient } from 'redis';

const client = createClient({
    password: 'gG6CVFkvVMsQipoiy2jTUgMrz1sdwhPO',
    socket: {
        host: 'redis-10568.c336.samerica-east1-1.gce.redns.redis-cloud.com',
        port: 10568
    }
});
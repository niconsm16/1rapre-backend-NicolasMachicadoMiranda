import { cpus } from 'os'
import cluster from 'cluster'
import { Server as http } from 'http'


export default class Server {

    constructor(app) {
        this.server = http(app)
    }

    fork = (PORT) => {

        this.server
            .listen(PORT, () => { console.log(`Oyendo desde el puerto ${this.server.address().port} - http://localhost:${PORT}`) })
            .on('error', err => console.log('Surgió el siguiente inconveniente:', err))
    }

    cluster = (PORT) => {
        const numCPUs = cpus().length

        if (cluster.isPrimary) {

            console.log('Número de clusters (procesadores) posibles:', numCPUs)
            console.log(`Master ${process.pid}: INICIALIZADO`)

            for (let i = 0; i < numCPUs; i++) { cluster.fork() }

            cluster.on('exit', worker => {
                console.log('worker', worker.process.pid, 'caído -', new Date().toLocaleString())
                cluster.fork()
            })

        } else {
            console.log(`Proceso Cluster: Puerto ${PORT} - pid: ${process.pid}`)
            this.server
                .listen(PORT, () => { console.log(`Oyendo desde ${this.server.address().port} - http://localhost:${PORT}`) })
                .on('error', err => console.log('Surgió el siguiente inconveniente:', err))
        }
    }
}
const pcap = require('pcap');

class packetAnalyzer {
    constructor() {
        this.session = null;
    }

    startCapture(interfaceName = 'eth0', filter = '') {
        try{
            //iniciando a captura de pacotes
            this.session = pcap.createSession(interfaceName, { filter });
            console.log(`Capturando pacotes na interface: ${interfaceName} com o filtro: "${filter}"`);
        
            //Listador para pacotes capturados
            this.session.on('packet', (rawPacket) => {
                const packet = pcap.decode.packet(rawPacket);
                this.processPacket(packet);
            });
        } catch (error) {
            console.error('Erro ao iniciar a captura de pacotes:', error.message);
        }
    }

    stopCapture(){
        if (this.session){
            this.session.close();
            console.log('Captura de pacotes interrompida.');
        }
    }

    processPacket(packet) {
        try{
            const ethernet = packet.payload;
            const ip = ethernet.payload;
            const tcpOrUdp = ip.payload;

            if (ip && tcpOrUdp){
                console.log('Pacote capturado:');
                console.log(`Origem: ${ip.saddr}`);
                console.log(`Destino: ${ip.daddr}`);
                console.log(`Protocolo: ${ip.protocol}`);
            }
        } catch (error) {
            console.error('Error ao processar pacote:', error.message);
        }
    }
}

module.exports = packetAnalyzer;
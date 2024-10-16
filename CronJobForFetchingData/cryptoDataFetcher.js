import cron from 'node-cron';
import axios from 'axios';
import Crypto from '../model/crypto.js'

const fetchCryptoData = () =>{
    cron.schedule(process.env.CRON_JOB_INTERVAL, async () =>{
        try{
            const url = process.env.COINGECKO_API_URL;
        

            const {data} = await axios.get(url);

            const cryptoData = [
                {
                    coin: 'bitcoin',
                    price: data.bitcoin.usd,
                    marketCap: data.bitcoin.usd_market_cap,
                    change24h: data.bitcoin.usd_24h_change
                },
                {
                    coin: 'ethereum',
                    price: data.ethereum.usd,
                    marketCap: data.ethereum.usd_market_cap,
                    change24h: data.ethereum.usd_24h_change
                },
                {
                    coin: 'matic-network',
                    price: data['matic-network'].usd,
                    marketCap: data['matic-network'].usd_market_cap,
                    change24h: data['matic-network'].usd_24h_change
                },

            ];
            await Crypto.insertMany(cryptoData);
            console.log('Crypto data updated at :'+ new Date().toString());
        } catch(error){
            console.error('Error while fetching crypto data:',error);
        }
    })
}

export default fetchCryptoData;
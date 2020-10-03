import { Inject, Injectable } from '@angular/core';
import { Observable, Subject, Subscription }    from 'rxjs';
import * as HelloWorldContract from '../../assets/contracts/HelloWorld.json';
import { WEB3 } from '../injectors/web3';
import Web3 from 'web3';
import Swal from 'sweetalert2';
import { Observer } from 'rxjs/internal/types';

@Injectable()
export class HelloWorldContractService {

    helloWorldContract:any;
    blkport:string = "5777";

    //private wordChangedEvent  = new Subject<any>(); 

    //public wordChangedEvent$ = this.wordChangedEvent.asObservable();

    wordChangedEvent:any;
    
    constructor(@Inject(WEB3) private web3: Web3) {
        this.helloWorldContract = new this.web3.eth.Contract(HelloWorldContract.abi,
            HelloWorldContract.networks[this.blkport].address);
        
        const self = this        
        
        /*this.helloWorldContract.events.wordChanged( {fromBlock: 0 , toBlock: 'latest'},  function(error, event){
            console.log(error);
            console.log(event);
        }).on('data', (log) => {
            console.log("log",log.returnValues);
        })
        .on('changed', (log) => {
        console.log(`Changed: ${log}`)
        })
        .on('error', (log) => {
        console.log(`error:  ${log}`)
        })*/


    }

    hi(cb=null):void{
        this.helloWorldContract.methods.hi().call().then(function(data) {      
            console.log("contract response",data);
            cb ? cb(data,false) : null             
        }).catch(error => {
            console.error(error)
            cb ? cb(false,error) : null           
        });
    }

    greet(word:string,userAccount:any,cb=null):void{
        this.helloWorldContract.methods.greet( word ).send({ from: userAccount }).on("receipt", function(receipt) {
            console.log("receipt",receipt);
            cb ? cb(receipt,false) : null 
          })
          .on("error", function(error) {
            console.error(error)
            cb ? cb(false,error) : null 
        });
            
    }

}
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { WEB3 } from '../../injectors/web3';
import Web3 from 'web3';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import * as HelloWorldContract from '../../../assets/contracts/HelloWorld.json';
import Swal from 'sweetalert2';

@Component({
  selector: 'contracts-board',
  templateUrl: './contractsBoard.component.html',
  styleUrls: ['./contractsBoard.component.scss']
})


export class ContractsBoardComponent implements OnInit {


  contracts:Array<any>

  @ViewChild('content') content:ElementRef;

  helloWorldContract:any;
  blkport:string = "5777";
  userAccount:any;
  helloWorldCurrentState:string
  helloWorldWord:string

  constructor(@Inject(WEB3) private web3: Web3,private modalService: NgbModal) {    
    this.helloWorldWord = ""
  }



  async ngOnInit(){

    console.log("HelloWorldContract",HelloWorldContract)
    
    //console.log("this.web3.currentProvider",this.web3.currentProvider)

    if ('enable' in this.web3.currentProvider) {
      await this.web3.currentProvider.enable();
    }   

    const accounts = await this.web3.eth.getAccounts();
    console.log("accounts",accounts);
    this.userAccount = accounts[0];

    const lastBlock = await this.web3.eth.getBlockNumber();

    console.log("lastBlock",lastBlock);

    this.helloWorldContract = new this.web3.eth.Contract(HelloWorldContract.abi,
      HelloWorldContract.networks[this.blkport].address);

    this.contracts = [
      {
        title:"Test Contract",
        image:"https://images.unsplash.com/photo-1519336367661-eba9c1dfa5e9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80",
        description:"test contract for check integration",
      }
    ]
  
    console.log("this.contracts",this.contracts)

    this.helloWorldContract.events.wordChanged( {fromBlock: 0 , toBlock: 'latest'},  function(error, event){
      console.log(error);
      console.log(event);
    })
    .on('data', (log) => {
      console.log("log",log.returnValues);
      let { returnValues: { _bussinesName, _bussinesid, _contactPhone, _createdAt }, blockNumber } = log

    })
    .on('changed', (log) => {
      console.log(`Changed: ${log}`)
    })
    .on('error', (log) => {
      console.log(`error:  ${log}`)
    })
    
  }

  contractAction(contractTitle){
    switch (contractTitle) {
      case "Test Contract":
        this.openModal()
      break
      
    }
  }

  openModal() {

    this.helloWorldWord = ""

    const self = this

    this.helloWorldContract.methods.hi().call().then(function(data) {
      
      console.log("contract response");
      console.log(data);
      self.helloWorldCurrentState = data

    }).catch(error => {
      console.error(error)
      Swal.fire("Espera","Sucedio un error","error")
    });

    this.modalService.open(this.content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      console.log("result",result)
      
    }, (reason) => {
      console.log("reason",reason)
    });
  }

  saveHelloWorld(){
    
    console.log("saveHelloWorld")

    if(!this.helloWorldWord)
    {
      return Swal.fire("Espera","debes poner un valor valido","warning")
    }

    this.helloWorldContract.methods.greet( this.helloWorldWord ).send({ from: this.userAccount })
    .on("receipt", function(receipt) {
      console.log(receipt);
      Swal.fire("Bien","Datos registrados","success")
    })
    .on("error", function(error) {
      console.error(error)
      Swal.fire("Espera","Sucedio un error","error")
    });
      
  }

}


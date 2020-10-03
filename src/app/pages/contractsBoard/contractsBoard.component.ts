import { Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { WEB3 } from '../../injectors/web3';
import Web3 from 'web3';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { HelloWorldContractService } from '../../services/hello-world.contract.service'
import { Subscription } from 'rxjs';

@Component({
  selector: 'contracts-board',
  templateUrl: './contractsBoard.component.html',
  styleUrls: ['./contractsBoard.component.scss']
})


export class ContractsBoardComponent implements OnInit , OnDestroy {


  contracts:Array<any>

  @ViewChild('content') content:ElementRef;

  helloWorldContract:any;
  userAccount:any;
  helloWorldCurrentState:string
  helloWorldWord:string
  //helloWorldSubscription: Subscription;

  constructor(@Inject(WEB3) private web3: Web3,
    private modalService: NgbModal,
    private helloWorldContractService:HelloWorldContractService) {    
    this.helloWorldWord = ""    
  }

  

  async ngOnInit(){

    if ('enable' in this.web3.currentProvider) {
      await this.web3.currentProvider.enable();
    }   

    const accounts = await this.web3.eth.getAccounts();
    console.log("accounts",accounts);
    this.userAccount = accounts[0];

    const lastBlock = await this.web3.eth.getBlockNumber();

    console.log("lastBlock",lastBlock);  

    this.contracts = [
      {
        title:"Test Contract",
        image:"https://images.unsplash.com/photo-1519336367661-eba9c1dfa5e9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80",
        description:"test contract for check integration",
      }
    ]
  
    console.log("this.contracts",this.contracts)

    this.helloWorldContractService.helloWorldContract.events.wordChanged( {fromBlock: 0 , toBlock: 'latest'},  function(error, event){
      console.log(error);
      console.log(event);
    }).on('data', (log) => {
        console.log("log",log.returnValues);
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

    const self = this

    this.helloWorldWord = ""   

    this.helloWorldContractService.hi( ( success , error ) => {
      if(success)
      {
        self.helloWorldCurrentState = success
      }else{
        Swal.fire("Espera","Sucedio un error","error")
      }
    })

    this.modalService.open(this.content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      console.log("result",result)
      
    }, (reason) => {
      console.log("reason",reason)
    });
  }

  saveHelloWorld(){

    const self = this
    
    console.log("saveHelloWorld")

    if(!this.helloWorldWord)
    {
      return Swal.fire("Espera","debes poner un valor valido","warning")
    }

    this.helloWorldContractService.greet(this.helloWorldWord,this.userAccount, ( success , error ) => {
      if(success)
      {
        self.helloWorldCurrentState = self.helloWorldWord
        Swal.fire("Bien","Datos registrados","success")
      }else{
        Swal.fire("Espera","Sucedio un error","error")
      }
    })
      
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    //this.helloWorldSubscription.unsubscribe();
  }

}


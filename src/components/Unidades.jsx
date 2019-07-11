import React from "react";
import { Chip,TextField, Fab, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, List, ListItemText, ListItem  } from "@material-ui/core";
import AddCircle from "@material-ui/icons/AddCircle";
import api from "../Services/Api";
import { withStyles } from "@material-ui/core/styles";
import { UnidAdm } from "./UnidAdm";
import { Connector } from "./Connector";


const styles = theme => ({
  fab: {
    margin: theme.spacing.unit
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
  }
});


class Unidades extends React.Component {
  constructor(props) {
    super(props);
    this.state = { unidades: [], selecteds: [], newNome:"", newSigla:"", errorMessage:"", estrutura:[], connections:[] };
    this.handleAdd = this.handleAdd.bind(this);
    this.handleSelectUn = this.handleSelectUn.bind(this);
    this.handleNewUN = this.handleNewUN.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidUpdate(prevProps, prevState){
    if(this.state.ready)
    {
    this.setState({ready:false})
    }
  }
  
  componentWillMount() {
    api.get("/api/unidade").then(res => {

      function getUnNivel(un,niv){
        let itens = [];
  
        if(un.childrens){
          un.childrens.forEach(element =>{
            let ret = getUnNivel(element,niv);
            if(ret.length > 0)
            itens = itens.concat(...ret);
          })
        }
  
        if(un.nivel == niv)
        itens.push(un);
        
        return itens;
  
      }

      let unidades = res.data;
      let clone = [...unidades];
      let struct = [];
      let connects = [];

      for(let i = 0; i < unidades.length; i++)
      {
        if(unidades[i].pai)
        {
          let reference = unidades.find(e => {return e.id == unidades[i].pai})
          if(reference.childrens)
            reference.childrens.push(unidades[i]);
            else
            reference.childrens = [unidades[i]];

            connects.push({pai: reference, filho: unidades[i]})

            let index = clone.indexOf(unidades[i]);
            if(index != null)
            clone.splice(index,1);
          
      }
    }
    let max = clone.reduce((a,b)=>{return Math.max(a,b.nivel) },0)
    for(let u = 0; u < clone.length; u++)
    {
      let mount = [];

    for(let n = max; n > 0; n--)
    {
      mount.push(getUnNivel(clone[u],n));
    }
     struct.push(mount);
  }
        this.setState({ estrutura: struct, unidades: unidades, ready: true, niveis: max, connections:connects });
      
    });
  }



  handleClick(un) {
    this.props.history.push("/Stack/" + un);
  }

  handleAdd(){
    this.setState({showAdd:true});
  }

  handleSelectUn(i){
    if(this.state.selecteds.includes(i))
    {
      let newSelecteds = [...this.state.selecteds]
      var index = newSelecteds.indexOf(i);
      newSelecteds.splice(index,1);
      this.setState({selecteds: newSelecteds})

    }
    else
    this.setState({selecteds: [...this.state.selecteds,i]})
  }

  handleNewUN(){
    api
      .post("/api/unidade", {
        unNome: this.state.newNome,
        unSigla: this.state.newSigla,
        unidades: this.state.selecteds
      })
      .then(x => {this.setState({ selecteds: [], newNome:"", newSigla:"", showAdd:false, errorMessage:"" });
      api.get("/api/unidade").then(res => {
        if (res) this.setState({ unidades: res.data });
      });
    })
      .catch(error => this.setState({errorMessage:error}));
  }

  render() {
    let _this = this;
    const { classes } = this.props;
    let modal;

    let renderChildrens = un =>{
      if(un.childrens)
      {
        return(
        <div>
          <UnidAdm onClick={_this.handleClick} sigla={un.sigla} nome={un.nome} obj={un} key={un.sigla}/>
          <div style={{display:'flex', flexDirection:'row'}}>
            {un.childrens.map(a => renderChildrens(a))}
          </div>
        </div>)
      }
      else
      {
        return (
        <div>
        <UnidAdm onClick={_this.handleClick} sigla={un.sigla} nome={un.nome} obj={un} key={un.sigla}/>
        </div>
        )
      }

    }

    



    if(this.state.showAdd)
    {
      modal = (
        <Dialog
        open={true}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Adicionar nova Unidade"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Defina o nome e a sigla da unidade a ser criada. Por fim, selecione as unidades vinculadas hierarquicamente abaixo da mesma.
          </DialogContentText>
          <div className="propsUn">
          <TextField
          style={{width:"60%", marginRight:"10%"}}
        label="Nome da nova Unidade"
        placeholder="Placeholder"
        margin="normal"
        value={this.state.newNome}
        onChange={(evt)=> this.setState({newNome:evt.target.value})}
      />
      <TextField
      style={{width:"30%"}}
        label="Sigla da nova Unidade"
        placeholder="Placeholder"
        margin="normal"
        value={this.state.newSigla}
        onChange={(evt)=> this.setState({newSigla:evt.target.value})}
      />
      </div>
      <List component="nav">
      {this.state.unidades.map(function(a, i) {
          return (
        <ListItem
          button
          selected={_this.state.selecteds.includes(a.sigla)}
          onClick={event => _this.handleSelectUn(a.sigla)}
        >
          <ListItemText primary={a.nome} />
          </ListItem>
          );
        })
      }
        
      </List>
      <DialogContentText id="alert-dialog-description">
            {this.state.errorMessage}
          </DialogContentText>
        </DialogContent>
        
        <DialogActions>
          <Button  color="primary" onClick={() => this.setState({showAdd:false, selecteds:[]})}>
            Cancelar
          </Button>
          <Button  color="primary" autoFocus onClick={this.handleNewUN}>
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
      )
    }




    return (
      <div
        className="vertical-center"
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          width: "100vw",
          textAlign: "center",
          justifyContent: "center"
        }}
      >
        <div  style={{display: 'flex', height:'100%',alignItems:'center',
    }}>

     {/* {this.state.estrutura.map(strut =>{
        return(

        <div style={{ display:'flex', flexDirection:'column', alignItems:'center'}}>

    {strut.map(nivel => {
      return(
      <div style={{display:'flex', minHeight:'1rem', verticalAlign:'middle', marginBottom: '4rem'}}>

        {nivel.length > 0 ?nivel.map((un,i) =>{
          return (<UnidAdm onClick={_this.handleClick} sigla={un.sigla} nome={un.nome} obj={un} key={un.sigla} chil={un.childrens? un.childrens.length:0}/>)

        }): <UnidAdm dummie='true'/>}

      </div>
      )
    })}

    </div>

        );
      })}
*/}

{this.state.estrutura.length > 0 ? this.state.estrutura[0][0].map(a =>
{
  return renderChildrens(a);
}

): null}

        
      </div>

        {modal}
        <div style={{ position: "fixed", right: 0, bottom: 0 }}>
              <Fab
                color="primary"
                aria-label="Undo"
                className={classes.fab}
                onClick={this.handleAdd}
              >
                <AddCircle />
              </Fab>
            </div>


            <svg style={{position:'absolute', top:0, left:0, zIndex:'-1', overflow:'visible'}} width={'100%'} height={'100%'} >
        {this.state.connections.map(a=>{
          if(!a.filho.dom || !a.pai.dom)
          return null;
          return(
            <Connector starta={a.filho.dom} enda={a.pai.dom} />
          )

        })}
        </svg>

      </div>
    );
  }
}


export default withStyles(styles)(Unidades);

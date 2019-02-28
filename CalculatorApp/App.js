import React from 'react';
import { StyleSheet,
         Text,
         View,
         AppRegistry,
         TextInput,
         TouchableOpacity,
         TouchableHighlight,
         StatusBar,
         Alert
       } from 'react-native';

export default class CalculatorApp extends React.Component {

  constructor(){
    super()
    this.state = {
      input: "",
      expression: "",
      isPositive : true
    }
    this.addInput = this.addInput.bind(this)
    this.calculate = this.calculate.bind(this)
    this.reset = this.reset.bind(this)
    this.delete = this.delete.bind(this)
    this.bracket = this.bracket.bind(this)
    this.plusSlashMinus = this.plusSlashMinus.bind(this)
    this.checkLength = this.checkLength.bind(this)
  }

  addInput(input){
    let value = this.state.input
    if (value.length > 11){
      Alert.alert('Maximum reached')
      this.setState({
        input: value
      })
    }else{
      value += input
      this.setState({
        input:value
      })
    }
  }

  calculate(){
    try{
      let result = eval(this.state.input)
      var resultTostring = result.toString()
      let resultLength = resultTostring.length

      if (resultLength > 10 && resultTostring.includes('.')){
          result = resultTostring.slice(0, 10)
          const expressions = this.state.input + " = "
          this.setState({
            input: result.toString(),
            expression : expressions,
          })
      }else{
        let result = eval(this.state.input)
        const expressions = this.state.input + " = "
        this.setState({
          input: result.toString(),
          expression : expressions,
        })

      }
    }
    catch(e){
      this.setState({
        input:'Error'
      })
    }

  }

  reset(){
    this.setState({
      input: "",
      expression:""
    })
  }

  delete(){
    var inputLength = this.state.input.length
    var inputs = ""
    if (this.state.input[inputLength-1] === " "){
      inputs = this.state.input.slice(0, inputLength-3)
    }else{
      inputs = this.state.input.slice(0, inputLength-1)
    }
    this.setState({
      input:inputs,
      expression: " "
    })
  }

  bracket(){
    var inputs = this.state.input
    if (inputs.includes("(")){
      inputs += ")"
    }else{
      inputs += "("
    }
    this.setState({
      input: inputs
    })
  }

  plusSlashMinus(){
    var inputs = this.state.input
    if (!inputs.includes("-")){
        inputs =  "-" + inputs
    }else{
      inputs = inputs.replace('-', " ")
    }
    this.setState({
      input : inputs
    })
  }

  checkLength(){
    if (this.state.input.length > 10){
    }
  }

  render() {
    return (

      <View style={styles.container}>
          <StatusBar hidden={true} />
          <NavBar></NavBar>
          <View style={styles.windowStyle}>
              <Text style={styles.expression}>{this.state.expression}</Text>
              <TextInput style={styles.textInputStyle}
                                onChangeText={(input)=>{this.setState({input})}}
                                value={this.state.input} editable={false}
              />
          </View>
          <View style={styles.allButtons}>
              <View style={styles.buttonDisplay}>
                  <OperatorButton character='AC'  onPress={this.reset}/>
                  <OperatorButton character='/'  onPress={()=>this.addInput(' / ')}/>
                  <OperatorButton character='*'  onPress={()=>this.addInput(' * ')} />
                  <OperatorButton character='Del'  onPress={this.delete}/>
              </View>
              <View style={styles.buttonDisplay}>
                  <NumberButton  character='7' onPress={()=>this.addInput(7)}/>
                  <NumberButton  character='8'  onPress={()=>this.addInput(8)}/>
                  <NumberButton  character='9'  onPress={()=>this.addInput(9)}/>
                  <OperatorButton character='-'  onPress={()=>this.addInput(' - ')}/>
              </View>
              <View style={styles.buttonDisplay}>
                  <NumberButton  character='4'  onPress={()=>this.addInput(4)}/>
                  <NumberButton  character='5'  onPress={()=>this.addInput(5)}/>
                  <NumberButton  character='6'  onPress={()=>this.addInput(6)}/>
                  <OperatorButton  character='+'  onPress={()=>this.addInput(" + ")}/>
              </View>
              <View style={styles.buttonDisplay}>
                  <NumberButton  character='1'  onPress={()=>this.addInput(1)}/>
                  <NumberButton  character='2'  onPress={()=>this.addInput(2)}/>
                  <NumberButton  character='3'  onPress={()=>this.addInput(3)}/>
                  <OperatorButton  character='( )'  onPress={this.bracket}/>
              </View>
              <View style={styles.buttonDisplay}>
                  <NumberButton  character='0'  onPress={()=>this.addInput(0)}/>
                  <NumberButton  character='.'  onPress={()=>this.addInput(".")}/>
                  <NumberButton  character='⁺∕₋'  onPress={this.plusSlashMinus}/>
                  <OperatorButton  character='='  onPress={this.calculate}/>
              </View>
          </View>
      </View>
    );
  }
}

class NavBar extends React.Component{
  render(){
    return(
      <View style={styles.navBarStyle}>
      </View>
    )
  }
}

class OperatorButton extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    return(
          <TouchableOpacity onPress={this.props.onPress}>
              <View style={styles.button}>
                  <Text style={styles.buttonText}>{this.props.character}</Text>
              </View>
          </TouchableOpacity>
    )
  }
}
class NumberButton extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    return(
          {/* Adding press event to our custom button https://stackoverflow.com/
               questions/39037705/how-to-use-onpress-on-a-custom-component*/},
          <TouchableHighlight underlayColor='white' onPress={this.props.onPress}>
              <View style={styles.numberButtons}>
                  <Text style={styles.numberButtonText}>{this.props.character}</Text>
              </View>
          </TouchableHighlight>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  textInputStyle: {
    height: 70,
    flexDirection: 'row',
    color: '#546e7a',
    fontSize: 50,
  },
  windowStyle:{
    paddingTop: 40,
  },
  navBarStyle: {
    height:70,
    backgroundColor: '#26a69a',
  },
  buttonText: {
    padding: 20,
    color: '#26a69a',
    textAlign:'center',
    fontWeight: 'bold',
    fontSize: 25
  },
  button: {
    backgroundColor: '#f5f5f5',
    width: 82,
    borderRadius: 5,
  },
  buttonDisplay: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding:2
  },
  numberButtons :{
    backgroundColor: '#cfd8dc',
    width: 82,
    borderRadius: 5,
  },
  numberButtonText: {
    padding: 20,
    color: '#000',
    textAlign:'center',
    fontSize: 30
  },
  allButtons:{
    justifyContent: 'flex-end',
    flex:1
  },
  expression :{
    fontSize: 20,
    paddingLeft: 5
  }
});

AppRegistry.registerComponent('CalculatorApp', ()=> CalculatorApp)

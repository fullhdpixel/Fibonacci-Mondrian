import React from "react"
import {Text, View} from "react-native"

import {
  Container,
  Header,
  Body,
  Title,
  Content,
  List,
  ListItem,
  Button
} from "native-base";

export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      // initialize fibonacci with first two elements: 0 and 1
      fibArray: [
        {
          key: 0,
          number: 0
        }, {
          key: 1,
          number: 1
        }
      ],
      maxFibonacci: 8 //Maximum of elements to calculate.
    }
  }

  componentDidMount() {
    // Each second a new number is added to the sequence and printed on the screen.
    this.timer = setInterval(() => {
      this.fibonacci()
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer) //Release the timer
  }

  /* 
  * Returns array with numbers of fibonacci (1,2,3,5)
  */
  fibonacci = (max) => {
    this.setState((state) => {
      const {fibArray, maxFibonacci} = state

      let key = fibArray.length
      let number = fibArray[fibArray.length - 2].number + fibArray[fibArray.length - 1].number

      if (maxFibonacci == key) {
        return clearInterval(this.timer) //Release the timer
      }

      return {
        fibArray: fibArray.concat({key, number})
      }
    })
  }

  OneMoreTime = () => {
    this.setState((state) => {
      return {
        maxFibonacci: state.maxFibonacci + 1
      }
    }, () => {
      this.fibonacci()
    });
  }

  render() {
    const {fibArray} = this.state; //Capture elements in the state we use to render
    const elements = fibArray.length; //Items in the array

    //Sum the numbers in the array
    let sum = fibArray.reduce((accumulator, current) => accumulator + current.number, 0)

    return (
      <Container>
        <Header>
          <Body>
            <Title>Fibonacci Numbers</Title>
          </Body>
        </Header>
        <Content>
          <List>
            <ListItem itemDivider first>
              <Text>Elements: {elements}</Text>
            </ListItem>
            <ListItem itemDivider first>
              <Text>Sum: {sum}</Text>
            </ListItem>
          </List>
          <Button full onPress={this.OneMoreTime()}>
            <Text style={{
              color: "white"
            }}>One More Time</Text>
          </Button>
          <List
            dataArray={fibArray}
            renderRow={(item) => <ListItem key={item.key}>
            <Text>{item.number}</Text>
          </ListItem>}/>
        </Content>
      </Container>
    )
  }
}
import React from 'react'
import { Header, Image, Table } from 'semantic-ui-react'

const TableExampleCollapsing = () => (
  <Table basic='very' celled collapsing>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Things To Pack</Table.HeaderCell>
        <Table.HeaderCell>Remained</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      <Table.Row>
        <Table.Cell>
          <Header as='h4' image>
            <Image src='./itemImg/sunglasses.jpg' rounded size='mini' />
            <Header.Content>
              Glasses
              {/* <Header.Subheader>Human Resources</Header.Subheader> */}
            </Header.Content>
          </Header>
        </Table.Cell>
        <Table.Cell>1</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <Header as='h4' image>
            <Image src='./itemImg/tshirt.jpg' rounded size='mini' />
            <Header.Content>
              T-shirt
              
            </Header.Content>
          </Header>
        </Table.Cell>
        <Table.Cell>5</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <Header as='h4' image>
            <Image src='./itemImg/sunscreen.jpg' rounded size='mini' />
            <Header.Content>
              Sunscreen
              
            </Header.Content>
          </Header>
        </Table.Cell>
        <Table.Cell>1</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <Header as='h4' image>
            <Image src='./itemImg/goggles.jpg' rounded size='mini' />
            <Header.Content>
              Goggles
              
            </Header.Content>
          </Header>
        </Table.Cell>
        <Table.Cell>2</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <Header as='h4' image>
            <Image src='./itemImg/swimsuit.jpeg' rounded size='mini' />
            <Header.Content>
             Swimsuit
            </Header.Content>
          </Header>
        </Table.Cell>
        <Table.Cell>4</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <Header as='h4' image>
            <Image src='./itemImg/socks.jpeg' rounded size='mini' />
            <Header.Content>
              Socks
              {/* <Header.Subheader>Human Resources</Header.Subheader> */}
            </Header.Content>
          </Header>
        </Table.Cell>
        <Table.Cell>6</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <Header as='h4' image>
            <Image src='./itemImg/skiis.jpeg' rounded size='mini' />
            <Header.Content>
              Skiis
            </Header.Content>
          </Header>
        </Table.Cell>
        <Table.Cell>1</Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
)

export default TableExampleCollapsing
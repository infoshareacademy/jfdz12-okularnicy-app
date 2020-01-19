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
            <Image src='/images/avatar/small/lena.png' rounded size='mini' />
            <Header.Content>
              Glasses
              {/* <Header.Subheader>Human Resources</Header.Subheader> */}
            </Header.Content>
          </Header>
        </Table.Cell>
        <Table.Cell>22</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <Header as='h4' image>
            <Image src='/images/avatar/small/matthew.png' rounded size='mini' />
            <Header.Content>
              Wallet
              
            </Header.Content>
          </Header>
        </Table.Cell>
        <Table.Cell>15</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <Header as='h4' image>
            <Image src='/images/avatar/small/lindsay.png' rounded size='mini' />
            <Header.Content>
              Shoes
              
            </Header.Content>
          </Header>
        </Table.Cell>
        <Table.Cell>12</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <Header as='h4' image>
            <Image src='/images/avatar/small/mark.png' rounded size='mini' />
            <Header.Content>
              Passport
              
            </Header.Content>
          </Header>
        </Table.Cell>
        <Table.Cell>11</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <Header as='h4' image>
            <Image src='/images/avatar/small/lena.png' rounded size='mini' />
            <Header.Content>
              Glasses
              {/* <Header.Subheader>Human Resources</Header.Subheader> */}
            </Header.Content>
          </Header>
        </Table.Cell>
        <Table.Cell>22</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <Header as='h4' image>
            <Image src='/images/avatar/small/lena.png' rounded size='mini' />
            <Header.Content>
              Glasses
              {/* <Header.Subheader>Human Resources</Header.Subheader> */}
            </Header.Content>
          </Header>
        </Table.Cell>
        <Table.Cell>22</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <Header as='h4' image>
            <Image src='/images/avatar/small/lena.png' rounded size='mini' />
            <Header.Content>
              Glasses
              {/* <Header.Subheader>Human Resources</Header.Subheader> */}
            </Header.Content>
          </Header>
        </Table.Cell>
        <Table.Cell>22</Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
)

export default TableExampleCollapsing
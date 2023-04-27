import { Table } from "evergreen-ui"
import { useEffect, useState } from "react";
import DataService from "../../shared/network/DataService";
import { OcppTransaction } from "../../shared/network/apiTypes";

export default function ListOcppTransactions() {

    const [transactions, setTransactions] = useState<Array<OcppTransaction>>([]);

    function fetchTransactions() {
        return DataService.getTransaction().then(
            (resp) => {
                console.log(resp);
                setTransactions(resp);
            }
        )
    }

    useEffect(() => {
        fetchTransactions();
    }, [])

    return <>
        <Table>
            <Table.Head>
                <Table.TextHeaderCell flexBasis={48} flexShrink={0} flexGrow={0}>#</Table.TextHeaderCell>
                <Table.TextHeaderCell>Ocpp ID</Table.TextHeaderCell>
                <Table.TextHeaderCell>Meter Start</Table.TextHeaderCell>
                <Table.TextHeaderCell>Meter Stop</Table.TextHeaderCell>
                <Table.TextHeaderCell>Date</Table.TextHeaderCell>
                <Table.TextHeaderCell>Duration (sec)</Table.TextHeaderCell>
            </Table.Head>
            <Table.Body>
                {transactions.map((transaction) => (
                    <Table.Row key={transaction.id}>
                        <Table.TextCell flexBasis={48} flexShrink={0} flexGrow={0}>{transaction.id}</Table.TextCell>
                        <Table.TextCell>{transaction.ocppIdentity}</Table.TextCell>
                        <Table.TextCell>{transaction.meterStart}</Table.TextCell>
                        <Table.TextCell>{transaction.meterStop}</Table.TextCell>
                        <Table.TextCell>{new Date(transaction.timestampStart).toLocaleDateString("en-US")}</Table.TextCell>
                        {
                            transaction.timestampStop &&
                            <Table.TextCell>
                                {new Date((new Date(transaction.timestampStop)).getTime() - (new Date(transaction.timestampStart)).getTime()).getSeconds()}
                            </Table.TextCell>
                        }
                        {
                            !transaction.timestampStop &&
                            <Table.TextCell>
                                {new Date((new Date()).getTime() - (new Date(transaction.timestampStart)).getTime()).getSeconds()}
                            </Table.TextCell>
                        }
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    </>
}
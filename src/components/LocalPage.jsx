import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Row, Col, Form, FormControl, Table } from 'react-bootstrap'

const LocalPage = () => {
    const [addresses, setAddresses] = useState([])
    const [query, setQuery] = useState('인하대학교')
    const [page, setPage] = useState(1)

    const getdata = async () => {
        const url = "https://dapi.kakao.com/v2/local/search/keyword.JSON";
        const config = {
            headers: { "Authorization": 'KakaoAK 7d083064dcb5ec4a4a7ddbbf9b1025c5' },
            params: { "query": query, "size": 8, "page": page }
        }

        const result = await axios.get(url, config)
        console.log(result.data.documents)
        setAddresses(result.data.documents)
    }

    const onSubmit = e => {
        e.preventDefault()
        setPage(1)
        getdata()
    }

    useEffect(() => {
        getdata()
    }, [])

    return (
        <Row>
            <Col>
                <h1 className='text-center my-5'>지역 검색</h1>

                <Col md={6}>
                    <Form onSubmit={onSubmit}>
                        <FormControl value={query} onChange={e => setQuery(e.target.value)} />
                    </Form>
                </Col>

                <Table className='my-5'>
                    <thead className='text-center my-5'>
                        <tr>
                            <td>장소명</td>
                            <td>주소</td>
                            <td>전화번호</td>
                        </tr>
                    </thead>

                    <tbody>
                        {addresses.map(address => (
                            <tr key={address.id}>
                                <td>{address.place_name}</td>
                                <td>{address.address_name}</td>
                                <td>{address.phone}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Col>
        </Row>
    )
}

export default LocalPage
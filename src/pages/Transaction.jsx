import React from "react";
import { Link, useParams } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { EtherContext } from "../context/Ether";
import { formatEther } from "ethers/lib/utils";
import { shortenAddress } from "../utils/shortenAddress";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const Transaction = () => {
    const [loading, setLoading] = useState(true);
    const { provider } = useContext(EtherContext);
    const { id } = useParams();
    const hash = id;

    const [transaction, setTransaction] = useState({});

    const getTransaction = async () => {
        const tx = await provider.getTransaction(hash);
        setTransaction(tx);
        setLoading(false);
    };

    useEffect(() => {
        getTransaction();
    }, []);

    return (
        <>
            {loading ? (
                <SkeletonTheme baseColor="#202020" highlightColor="#444">
                    <Skeleton
                        count={10}
                        height={20}
                        style={{
                            margin: "10px 0",
                        }}
                    />
                </SkeletonTheme>
            ) : (
                <div>
                    <h3 className="font-bold border-b border-border text-lg text-primary text-left pb-2 mb-4 mt-4">
                        Transaction Details
                    </h3>
                    <table>
                        <tbody>
                            <tr>
                                <td className="text-left py-2 w-1/3 text-gray-100">
                                    Hash
                                </td>
                                <td className="text-left py-2 text-secondary">
                                    {transaction.hash &&
                                        shortenAddress(transaction.hash)}
                                </td>
                            </tr>
                            <tr>
                                <td className="text-left py-2 w-1/3 text-gray-100">
                                    Block Number
                                </td>
                                <td className="text-left py-2 text-secondary">
                                    <Link
                                        to={`/block/${transaction.blockNumber}`}
                                    >
                                        {transaction.blockNumber}
                                    </Link>
                                </td>
                            </tr>
                            <tr>
                                <td className="text-left py-2 w-1/3 text-gray-100">
                                    From
                                </td>
                                <td className="text-left py-2 text-secondary">
                                    <Link to={`/account/${transaction.from}`}>
                                        {transaction.from &&
                                            shortenAddress(transaction.from)}
                                    </Link>
                                </td>
                            </tr>
                            <tr>
                                <td className="text-left py-2 w-1/3 text-gray-100">
                                    To
                                </td>
                                <td className="text-left py-2 text-secondary">
                                    <Link to={`/account/${transaction.to}`}>
                                        {transaction.to &&
                                            shortenAddress(transaction.to)}
                                    </Link>
                                </td>
                            </tr>
                            <tr>
                                <td className="text-left py-2 w-1/3 text-gray-100">
                                    Value
                                </td>
                                <td className="text-left py-2 text-secondary">
                                    {formatEther(
                                        transaction.value
                                            ? transaction.value
                                            : 0
                                    )}{" "}
                                    ETH
                                </td>
                            </tr>
                            <tr>
                                <td className="text-left py-2 w-1/3 text-gray-100">
                                    Gas Price
                                </td>
                                <td className="text-left py-2 text-secondary">
                                    {formatEther(
                                        transaction.gasPrice
                                            ? transaction.gasPrice
                                            : 0
                                    )}{" "}
                                    ETH
                                </td>
                            </tr>
                            <tr>
                                <td className="text-left py-2 w-1/3 text-gray-100">
                                    Gas Limit
                                </td>
                                <td className="text-left py-2 text-secondary">
                                    {formatEther(
                                        transaction.gasLimit
                                            ? transaction.gasLimit
                                            : 0
                                    )}{" "}
                                    ETH
                                </td>
                            </tr>
                            <tr>
                                <td className="text-left py-2 w-1/3 text-gray-100">
                                    Nonce
                                </td>
                                <td className="text-left py-2 text-secondary">
                                    {transaction.nonce}
                                </td>
                            </tr>
                            <tr>
                                <td className="text-left py-2 w-1/3 text-gray-100">
                                    Chain ID
                                </td>
                                <td className="text-left py-2 text-secondary">
                                    {transaction.chainId}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </>
    );
};

export default Transaction;

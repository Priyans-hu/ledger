export const filterByThisMonth = (transactions) => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    return transactions.filter(transaction => {
        const transactionDate = new Date(transaction.date);
        return transactionDate.getMonth() === currentMonth && transactionDate.getFullYear() === currentYear;
    });
};

export const filterByLastMonth = (transactions) => {
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);

    return transactions.filter(transaction => {
        const transactionDate = new Date(transaction.date);
        return (
            transactionDate.getMonth() === lastMonth.getMonth() &&
            transactionDate.getFullYear() === lastMonth.getFullYear()
        );
    });
};

export const filterByLast90Days = (transactions) => {
    const today = new Date();
    const startDate = new Date();
    startDate.setDate(today.getDate() - 90);

    return transactions.filter(transaction => {
        const transactionDate = new Date(transaction.date);
        return transactionDate >= startDate && transactionDate <= today;
    });
};

export const filterByThisYear = (transactions) => {
    const currentYear = new Date().getFullYear();

    return transactions.filter(transaction => {
        const transactionDate = new Date(transaction.date);
        return transactionDate.getFullYear() === currentYear;
    });
};

export const calculateDebitTotal = (transactions) => {
    return transactions.reduce((acc, transaction) => {
        return acc + (transaction.type === 'debit' ? parseFloat(transaction.amount) : 0);
    }, 0);
};

export const calculateCreditTotal = (transactions) => {
    return transactions.reduce((acc, transaction) => {
        return acc + (transaction.type === 'credit' ? parseFloat(transaction.amount) : 0);
    }, 0);
};

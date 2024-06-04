import { useParams } from 'react-router-dom';

export const useNavigatoChartNo = (total: number) => {
    const { no: navigatNo } = useParams<{ no: string }>();
    const no = navigatNo === undefined ? 0 : parseInt(navigatNo, 10) - 1;
    if (isNaN(no) || no < 0) {
        return 0;
    }

    if (no > total - 1) {
        return total - 1;
    }

    return no;
};

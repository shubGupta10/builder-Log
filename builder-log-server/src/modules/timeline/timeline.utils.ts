export function getCntributionLimits(from: string, to: string) {
    const diffDays = (new Date(to).getTime() - new Date(from).getTime()) / (1000 * 3600 * 24);

    if(diffDays <= 7){
        return {
            commitLimit: 50, prLimit: 20
        };
    }

    if(diffDays <= 30){
        return {
            commitLimit: 30, prLimit: 10
        }
    }

    return {
        commitLimit: 10, prLimit:5
    }
}
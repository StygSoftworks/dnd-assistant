import { Link as MuiLink, TableBody, TableCell, TableRow } from "@mui/material";
import { Link } from "react-router-dom";

const objectNames = (column) => {
	if (column.includes('.')) {
		return column.split('.');
	};
	return [];
};

const TableRows = ({sortedData, headers, id}) => {

	return (
		<TableBody key={id}>
			{sortedData.map((row) => (
				<TableRow key={row.name}>
					{headers.map((headerCell) => {
						const { column } = headerCell;
						const objNames = objectNames(column);
						if (column === 'name') {
							console.log(`/details-${id}/${encodeURIComponent(row.name)}`);
							return (
								<TableCell key={column}>
									<MuiLink component={Link} to={`/details-${id}/${encodeURIComponent(row.name)}`}>
										{row.name}
									</MuiLink>
								</TableCell>
							);
						} else if (objNames.length === 2){
							return (<TableCell key={column}>{row[objNames[0]][objNames[1]]}</TableCell>);
						} else if (objNames.length === 3){
							return (<TableCell key={column}>{row[objNames[0]][objNames[1]][objNames[2]]}</TableCell>);
						} else { 
						return (<TableCell key={column}>{row[column]}</TableCell>)
						}
					})}
				</TableRow>
			))}
		</TableBody>
	);
};

export default TableRows;

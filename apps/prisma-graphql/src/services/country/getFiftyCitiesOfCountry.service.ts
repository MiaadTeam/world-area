import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

const getFiftyCitiesOfCountryService = async (limit = 50, pageNumber = 1) => {
	const before = Date.now()
	
	const countries= await prisma.country.findMany({
		select: {
			name: true,
			abb: true,
			population:true,
			provinces: {
				take: limit*pageNumber,
				orderBy: {
					population: "desc"
				},
				select: {
					name: true,
					abb: true,
					population:true,
					cities: {
						select: {
							name: true,
							abb: true,
							population:true,
						},
						take: limit,
						orderBy: {
							population: "desc"
						},
					}
				}
			}
		}
	
	})

	const after = Date.now()
	const elapseTime = after - before
	console.log("Elapsed Time: ", elapseTime)

	return countries
}

export default getFiftyCitiesOfCountryService

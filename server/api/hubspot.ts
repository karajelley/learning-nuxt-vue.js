// server/api/hubspot.ts
import { defineEventHandler, getQuery } from 'h3'
import { Client } from '@hubspot/api-client'

const hubspotClient = new Client({
  accessToken: process.env.HUBSPOT_ACCESS_TOKEN
})

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const type = query.type as string | undefined
  const limit = parseInt(query.limit as string) || 50
  const page = parseInt(query.page as string) || 1

  try {
    const filteredResults: any[] = []

    let after: string | undefined = undefined
    let hasMore = true
    let totalFetched = 0

    while (hasMore) {
      const response = await hubspotClient.crm.contacts.basicApi.getPage(
        100,
        after,
        [
          'firstname',
          'lastname',
          'email',
          'phone',
          'type_de_contact',
          'tiering_auxiliaire',
          'tiering_prescripteur',
          'statut_du_prescripteur'
        ]
      )

      const filtered = response.results.filter((c) => {
        const contactType = c.properties.type_de_contact?.toLowerCase()
        return type ? contactType === type.toLowerCase() : true
      })

      filteredResults.push(...filtered)

      totalFetched += response.results.length
      hasMore = !!response.paging?.next?.after && filteredResults.length < page * limit
      after = response.paging?.next?.after
    }

    // Apply pagination on filtered results
    const paginatedResults = filteredResults.slice((page - 1) * limit, page * limit)

    return {
      contacts: paginatedResults,
      total: filteredResults.length,
      page,
      limit
    }
  } catch (error) {
    console.error('Error fetching contacts from HubSpot:', error)
    return {
      contacts: [],
      error: 'Failed to fetch contacts'
    }
  }
})

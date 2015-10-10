# R code for downloading the Brookings data on inequality                          #
# http://www.brookings.edu/research/reports2/2015/03/city-inequality-berube-holmes #
# Required packages:                                                               #
# readxl: Read in .xlsx files                                                      #
library(readxl)

# Download the Excel data from Brookings
download_url <- "http://www.brookings.edu/~/media/Research/Files/Papers/2015/03/09-cities-inequality/City-Inequality-2013-Appendix.xlsx?la=en"
download.file(download_url, 'City Inequality 2013 Appendix.xlsx')

# Read the Excel file into R
city.inequality.raw <- read_excel('City Inequality 2013 Appendix.xlsx')

# Parse the sheet
city.inequality.2013        <- city.inequality.raw[4:53, c(2, 4, 5)]
names(city.inequality.2013) <- c("City", "Lowest.Quintile", "Highest.Ventile")

# Save data
saveRDS(city.inequality.2013, file = "city-inequality-2013.rds")

# End of script

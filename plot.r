# R code for plotting the slope graph                                 #
# https://acaird.github.io/computers/r/2013/11/27/slopegraphs-ggplot/ #
# Required packages:                                                  #
# reshape2: Reshaping the data                                        #
# ggplot2: For plotting                                               #
# ggvis: For plotting                                                 #
library(reshape2)
library(ggplot2)
library(ggvis)

# Load the data created by download.r
city.inequality.2013 <- readRDS("city-inequality-2013.rds")

# Reshape the data
city.inequality.long       <- melt(city.inequality.2013, id.vars = c("City"))
city.inequality.long$value <- as.numeric(city.inequality.long$value)

# Plot the figure
p <- ggplot(city.inequality.long, aes(x = variable, y = value, group = City, colour = City))
p + geom_line()

city.inequality.long         %>% 
    ggvis(~variable, ~value) %>% 
    group_by(City)           %>% 
    layer_paths()            %>%
    add_tooltip(function(df) df$City)

# End of script

class FlightGoogle
  require "date"
  require "watir-webdriver"
  require "csv"
  @@dtReserve = Date.today.to_s
  attr_accessor :obCity
  attr_accessor :ibCity
  attr_accessor :obDate
  attr_accessor :ibDate
  def initialize(obCity,ibCity,obDate,ibDate)
    @obCity=obCity  #depart city
    @ibCity=ibCity  #arrival city
    @obDate=obDate  #yyyy-mm-dd
    @ibDate=ibDate  #yyyy-mm-dd
  end
  def getURL
    return "https://www.google.fr/flights/#search;f=#{@obCity};t=#{@ibCity};d=#{@obDate};r=#{@ibDate};so=p;eo=e"
  end
  def gotob
    url = getURL
    @b = Watir::Browser.new(:ie)
    @b.goto url
    @b.driver.manage.timeouts.implicit_wait = 2 #3 seconds
  end
  def getData(id)
    dataArr = []
    d = @b.divs :class => id
    d.each do |x|
      dataArr << x.text.delete(' \u20AC')
    end
    return dataArr
  end
  def getReport
    puts "this is the report as of #{@@dtReserve}..."
    $report = Hash.new
    $report['dtPrice'] = getData('GJJKPX2JFC')
    nbRow = $report['dtPrice'].collect.size
    $report['ID'] = (1..nbRow).to_a
    puts " the id are #{$report['ID']}"
    puts " the prices are #{$report['dtPrice']}"
    puts "the price has size of #{nbRow}"
    $report['dtReserve'] = dupVect(@@dtReserve,nbRow)
    puts " the ReserveDates are #{$report['dtReserve']}"
    $report['obCity'] = dupVect(obCity,nbRow)
    $report['ibCity'] = dupVect(ibCity,nbRow)
    $report['obDate'] = dupVect(obDate,nbRow)
    $report['ibDate'] = dupVect(ibDate,nbRow)
    $report['dtComp'] = getData('GJJKPX2PCC')[1..nbRow]
    puts " the company are #{$report['dtComp']}"
    $report['dtHours'] = getData('GJJKPX2KDC')[1..nbRow]
    $report['dtTrans'] = getData('GJJKPX2FGC')[1..nbRow]
    #dtPrice.size.times{report << [@@dtReserve, obCity, ibCity, obDate, ibDate]}
    #report << [dtComp[1..dtPrice.size], dtPrice, dtHours[1..dtPrice.size], dtTrans[1..dtPrice.size]]
    #report = report.transpose
    #puts "report done with #{@report.keys.length} of keys and #{@report.values.size} of values"
    return $report
  end
=begin
  def exportcsv
    rowid = -1
    CSV.open("testflight_#{@@dtReserve}.csv", 'w') do |csv|
      $report.each do
        rowid += 1
        puts rowid
        if rowid == 0
          csv << $report.keys
          # puts @report.keys
        else
            csv <<$report.values #.each do |x|
              #csv << x
              #end
        end# of if/else inside hsh
      end# of hsh's (rows)
      end
  end
=end
  def exportcsv
    CSV.open("testflight_#{@@dtReserve}.csv", 'w') do |csv|
      csv << $report.keys
      $report.each do |key, val|
        csv << [val].transpose
      end
    end
  end
  def dupVect(arr,num)
    temp = []
    num.times {temp << arr.to_s}
    return temp
  end
  def closeb
    @b.quit
  end
end
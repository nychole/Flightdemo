class FlightGoogle
  require "date"
  require "watir-webdriver"
  require "csv"

  @@dtReserve = Date.today.to_s
  attr_accessor :obCity
  attr_accessor :ibCity
  attr_accessor :obDate
  attr_accessor :ibDate
  attr_accessor :alTable

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
    begin
    @b = Watir::Browser.new(:ie)
    @b.goto url
    rescue
      @b.quit
      retry
    end
    @b.driver.manage.timeouts.implicit_wait = 1 #3 seconds
    puts @b.tables.html
    #@b.wait_until { @b.body.exists? }
    #@b.div(:class => 'GJJKPX2JFC').wait_until_present
  end
  def getData(id)
    dataArr = []
    begin
    r = 0
    d = @b.divs :class => id
    d.each do |x|
      r += 1
      if r < 999 then
      dataArr << x.text
      else
        break
      end
    end
    rescue
      self.closeb
      self.gotob
      retry
    end
    return dataArr
  end

  def getAllTable
    @alTable = @b.divs(:text => "aller-retour")
    return @alTable
  end
  def getAllData(row) #row should start from zero
    dataArr = Hash.new
    temp =[]
    #dataArr['test']=[]
    #dataArr['test2']=[]
    #d = @b.divs(:class => "gwt-HTML")[12]
    #d = @b.elements :class => /^GJJKPX2CEC/
    alTable = @alTable
    #nbRow = alTable.count
    a = alTable[row].parent
    #a = @b.div(:text => "aller-retour", :index=>r).parent
    a = a.parent until a.tag_name == 'a'
    a.divs.map {|x| temp << x.text }
    temp.delete_if {|i| i.include? "\n"}
    dataArr[:dtprice] = temp[0].gsub(/\D/,'').to_i
    dataArr[:dtComp] = temp[3]
    dataArr[:dtHours] = temp[4]
    dataArr[:dtTransit] = [temp[6]]#,temp[7]]
    #d = @b.div(:text => "aller-retour", :index=>0).parent.div.text
    #a = @b.div(:text => "aller-retour", :index=>r).parent
    #a = a.parent until a.tag_name == 'a'
    #puts d
    #dataArr = a.div.text # {|x| dataArr << x.text }
    #a.divs.map {|x| test << x.text }
    #dataArr['test2']=a.div.text
    #dataArr['test1'] = test
    #puts "test1 ... #{dataArr['test1']}"
    #dataArr.flatten! # you will get a one dimensional array
    #dataArr.uniq! # removes all duplicate entries
    #test.delete_if {|i| i.include? "\n"} # use double quote instead of single quote
    #dataArr['test2'] = test
    #puts "test2 ... #{dataArr['test2']}"
    return dataArr
  end


  def getReport #static name matching
    puts "this is the report as of #{@@dtReserve}..."
    @report = Hash.new
    @report[:dtPrice] = getData('GJJKPX2JFC').collect { |x| x.gsub(/\D/,'').to_i }
    nbRow = @report[:dtPrice].collect.size
    @report[:dtComp] = getData('GJJKPX2PCC')[1..nbRow]
    @report[:dtHours] = getData('GJJKPX2KDC')[1..nbRow]
    @report[:dtTrans] = getData('GJJKPX2FGC')[1..nbRow]

    return @report
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

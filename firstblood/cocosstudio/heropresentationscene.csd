<GameProjectFile>
  <PropertyGroup Type="Scene" Name="heropresentationscene" ID="71bbd554-1eb9-4758-8ab4-fd0d1c406bef" Version="2.3.2.3" />
  <Content ctype="GameProjectContent">
    <Content>
      <Animation Duration="0" Speed="1.0000" />
      <ObjectData Name="Scene" Tag="422" ctype="GameNodeObjectData">
        <Size X="960.0000" Y="640.0000" />
        <Children>
          <AbstractNodeData Name="Image_bg" CanEdit="False" Visible="False" ActionTag="775740898" Tag="423" IconVisible="False" HorizontalEdge="BothEdge" VerticalEdge="BothEdge" LeftMargin="-32.0000" RightMargin="-32.0000" TopMargin="13.0000" BottomMargin="13.0000" Scale9Width="1024" Scale9Height="615" ctype="ImageViewObjectData">
            <Size X="1024.0000" Y="614.0000" />
            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
            <Position X="480.0000" Y="320.0000" />
            <Scale ScaleX="1.0000" ScaleY="1.0000" />
            <CColor A="255" R="255" G="255" B="255" />
            <PrePosition X="0.5000" Y="0.5000" />
            <PreSize X="1.0667" Y="0.9594" />
            <FileData Type="Normal" Path="background/bg8.jpg" Plist="" />
          </AbstractNodeData>
          <AbstractNodeData Name="Panel_main" ActionTag="1463905733" Tag="62" IconVisible="False" HorizontalEdge="BothEdge" VerticalEdge="BothEdge" LeftMargin="55.0000" RightMargin="55.0000" TopMargin="20.0000" BottomMargin="20.0000" TouchEnable="True" BackColorAlpha="102" ColorAngle="90.0000" ctype="PanelObjectData">
            <Size X="850.0000" Y="600.0000" />
            <Children>
              <AbstractNodeData Name="Image_heroCard" ActionTag="-103213075" Tag="64" IconVisible="False" HorizontalEdge="BothEdge" RightMargin="519.0000" TopMargin="0.6286" BottomMargin="129.3714" TouchEnable="True" Scale9Width="331" Scale9Height="470" ctype="ImageViewObjectData">
                <Size X="331.0000" Y="470.0000" />
                <AnchorPoint />
                <Position Y="129.3714" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition Y="0.2156" />
                <PreSize X="0.3894" Y="0.7833" />
                <FileData Type="Normal" Path="heropresentationscene/hp_herocard.png" Plist="" />
              </AbstractNodeData>
              <AbstractNodeData Name="Button_discussion" ActionTag="-986469242" Tag="65" IconVisible="False" LeftMargin="-1.2467" RightMargin="705.2467" TopMargin="500.9197" BottomMargin="52.0803" TouchEnable="True" FontSize="14" Scale9Enable="True" LeftEage="15" RightEage="15" TopEage="11" BottomEage="11" Scale9OriginX="15" Scale9OriginY="11" Scale9Width="116" Scale9Height="25" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="ButtonObjectData">
                <Size X="146.0000" Y="47.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="71.7533" Y="75.5803" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.0844" Y="0.1260" />
                <PreSize X="0.1718" Y="0.0783" />
                <TextColor A="255" R="65" G="65" B="70" />
                <DisabledFileData Type="Default" Path="Default/Button_Disable.png" Plist="" />
                <NormalFileData Type="Normal" Path="heropresentationscene/hp_discussionbtn.png" Plist="" />
                <OutlineColor A="255" R="255" G="0" B="0" />
                <ShadowColor A="255" R="110" G="110" B="110" />
              </AbstractNodeData>
              <AbstractNodeData Name="Button_show" ActionTag="889671781" Tag="66" IconVisible="False" LeftMargin="184.6580" RightMargin="519.3420" TopMargin="501.4196" BottomMargin="52.5804" TouchEnable="True" FontSize="14" Scale9Enable="True" LeftEage="15" RightEage="15" TopEage="11" BottomEage="11" Scale9OriginX="15" Scale9OriginY="11" Scale9Width="116" Scale9Height="24" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="ButtonObjectData">
                <Size X="146.0000" Y="46.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="257.6580" Y="75.5804" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.3031" Y="0.1260" />
                <PreSize X="0.1718" Y="0.0767" />
                <TextColor A="255" R="65" G="65" B="70" />
                <DisabledFileData Type="Default" Path="Default/Button_Disable.png" Plist="" />
                <NormalFileData Type="Normal" Path="heropresentationscene/hp_showbtn.png" Plist="" />
                <OutlineColor A="255" R="255" G="0" B="0" />
                <ShadowColor A="255" R="110" G="110" B="110" />
              </AbstractNodeData>
              <AbstractNodeData Name="ScrollView_presentation" ActionTag="-1709882839" Tag="67" IconVisible="False" HorizontalEdge="BothEdge" VerticalEdge="BothEdge" LeftMargin="350.0000" TouchEnable="True" ClipAble="True" BackColorAlpha="102" ComboBoxIndex="1" ColorAngle="90.0000" IsBounceEnabled="True" ScrollDirectionType="Vertical" ctype="ScrollViewObjectData">
                <Size X="500.0000" Y="600.0000" />
                <Children>
                  <AbstractNodeData Name="Image_attributeBg" ActionTag="-957945318" Tag="68" IconVisible="False" LeftMargin="25.2074" RightMargin="95.7926" TopMargin="17.4002" BottomMargin="553.5998" Scale9Width="379" Scale9Height="29" ctype="ImageViewObjectData">
                    <Size X="379.0000" Y="29.0000" />
                    <Children>
                      <AbstractNodeData Name="Text_attribute" ActionTag="2083204343" Tag="69" IconVisible="False" HorizontalEdge="BothEdge" VerticalEdge="BothEdge" LeftMargin="6.8500" RightMargin="272.1500" TopMargin="-0.5000" BottomMargin="-0.5000" IsCustomSize="True" FontSize="22" LabelText="属 性" VerticalAlignmentType="VT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                        <Size X="100.0000" Y="30.0000" />
                        <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                        <Position X="56.8500" Y="14.5000" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="255" G="255" B="255" />
                        <PrePosition X="0.1500" Y="0.5000" />
                        <PreSize X="0.1042" Y="0.0469" />
                        <OutlineColor A="255" R="255" G="0" B="0" />
                        <ShadowColor A="255" R="110" G="110" B="110" />
                      </AbstractNodeData>
                    </Children>
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="214.7074" Y="568.0998" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.4294" Y="0.9468" />
                    <PreSize X="0.7580" Y="0.0483" />
                    <FileData Type="Normal" Path="heropresentationscene/hp_herobg.png" Plist="" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="Text_fight" ActionTag="-486344387" Tag="70" IconVisible="False" HorizontalEdge="BothEdge" LeftMargin="35.0000" RightMargin="365.0000" TopMargin="56.2202" BottomMargin="523.7798" IsCustomSize="True" FontSize="20" LabelText="战斗力：&#xA;" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                    <Size X="100.0000" Y="20.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="85.0000" Y="533.7798" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.1700" Y="0.8896" />
                    <PreSize X="0.0000" Y="0.0000" />
                    <OutlineColor A="255" R="255" G="0" B="0" />
                    <ShadowColor A="255" R="110" G="110" B="110" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="Text_level" ActionTag="1501561469" Tag="71" IconVisible="False" HorizontalEdge="BothEdge" LeftMargin="35.0000" RightMargin="365.0000" TopMargin="90.7068" BottomMargin="489.2932" IsCustomSize="True" FontSize="20" LabelText="等  级：" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                    <Size X="100.0000" Y="20.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="85.0000" Y="499.2932" />
                    <Scale ScaleX="0.9766" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.1700" Y="0.8322" />
                    <PreSize X="0.0000" Y="0.0000" />
                    <OutlineColor A="255" R="255" G="0" B="0" />
                    <ShadowColor A="255" R="110" G="110" B="110" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="Text_attack" ActionTag="-916493057" Tag="72" IconVisible="False" HorizontalEdge="BothEdge" LeftMargin="35.0000" RightMargin="365.0000" TopMargin="123.9166" BottomMargin="456.0834" IsCustomSize="True" FontSize="20" LabelText="攻  击：" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                    <Size X="100.0000" Y="20.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="85.0000" Y="466.0834" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.1700" Y="0.7768" />
                    <PreSize X="0.0000" Y="0.0000" />
                    <OutlineColor A="255" R="255" G="0" B="0" />
                    <ShadowColor A="255" R="110" G="110" B="110" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="Text_blood" ActionTag="2032565685" Tag="73" IconVisible="False" HorizontalEdge="BothEdge" LeftMargin="35.0000" RightMargin="365.0000" TopMargin="157.1254" BottomMargin="422.8746" IsCustomSize="True" FontSize="20" LabelText="生  命：" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                    <Size X="100.0000" Y="20.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="85.0000" Y="432.8746" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.1700" Y="0.7215" />
                    <PreSize X="0.0000" Y="0.0000" />
                    <OutlineColor A="255" R="255" G="0" B="0" />
                    <ShadowColor A="255" R="110" G="110" B="110" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="Text_fightValue" ActionTag="1411245071" Tag="74" IconVisible="False" HorizontalEdge="BothEdge" LeftMargin="135.0000" RightMargin="265.0000" TopMargin="56.2194" BottomMargin="523.7806" IsCustomSize="True" FontSize="20" LabelText="2141" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                    <Size X="100.0000" Y="20.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="185.0000" Y="533.7806" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.3700" Y="0.8896" />
                    <PreSize X="0.0000" Y="0.0000" />
                    <OutlineColor A="255" R="255" G="0" B="0" />
                    <ShadowColor A="255" R="110" G="110" B="110" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="Text_levelValue" ActionTag="-2111533459" Tag="75" IconVisible="False" HorizontalEdge="BothEdge" LeftMargin="135.0000" RightMargin="265.0000" TopMargin="89.2110" BottomMargin="490.7890" IsCustomSize="True" FontSize="20" LabelText="32&#xA;" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                    <Size X="100.0000" Y="20.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="185.0000" Y="500.7890" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.3700" Y="0.8346" />
                    <PreSize X="0.0000" Y="0.0000" />
                    <OutlineColor A="255" R="255" G="0" B="0" />
                    <ShadowColor A="255" R="110" G="110" B="110" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="Text_attackValue" ActionTag="-377018767" Tag="76" IconVisible="False" HorizontalEdge="BothEdge" LeftMargin="135.0000" RightMargin="265.0000" TopMargin="127.3108" BottomMargin="452.6892" IsCustomSize="True" FontSize="20" LabelText="1900" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                    <Size X="100.0000" Y="20.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="185.0000" Y="462.6892" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.3700" Y="0.7711" />
                    <PreSize X="0.0000" Y="0.0000" />
                    <OutlineColor A="255" R="255" G="0" B="0" />
                    <ShadowColor A="255" R="110" G="110" B="110" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="Text_bloodValue" ActionTag="-1360314198" Tag="77" IconVisible="False" HorizontalEdge="BothEdge" LeftMargin="135.0000" RightMargin="265.0000" TopMargin="159.1925" BottomMargin="420.8075" IsCustomSize="True" FontSize="20" LabelText="12000" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                    <Size X="100.0000" Y="20.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="185.0000" Y="430.8075" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.3700" Y="0.7180" />
                    <PreSize X="0.0000" Y="0.0000" />
                    <OutlineColor A="255" R="255" G="0" B="0" />
                    <ShadowColor A="255" R="110" G="110" B="110" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="Text_aptitudeName" ActionTag="-1275725071" Tag="78" IconVisible="False" LeftMargin="245.0736" RightMargin="154.9264" TopMargin="89.8309" BottomMargin="490.1691" IsCustomSize="True" FontSize="20" LabelText="资  质：" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                    <Size X="100.0000" Y="20.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="295.0736" Y="500.1691" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.5901" Y="0.8336" />
                    <PreSize X="0.0000" Y="0.0000" />
                    <OutlineColor A="255" R="255" G="0" B="0" />
                    <ShadowColor A="255" R="110" G="110" B="110" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="Text_aptitudeValue" ActionTag="1151769352" Tag="79" IconVisible="False" LeftMargin="348.5372" RightMargin="51.4628" TopMargin="90.8887" BottomMargin="489.1113" IsCustomSize="True" FontSize="20" LabelText="12" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                    <Size X="100.0000" Y="20.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="398.5372" Y="499.1113" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.7971" Y="0.8319" />
                    <PreSize X="0.0000" Y="0.0000" />
                    <OutlineColor A="255" R="255" G="0" B="0" />
                    <ShadowColor A="255" R="110" G="110" B="110" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="Text_guard" ActionTag="-299614298" Tag="80" IconVisible="False" LeftMargin="246.7538" RightMargin="153.2462" TopMargin="128.9886" BottomMargin="451.0114" IsCustomSize="True" FontSize="20" LabelText="防  御：" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                    <Size X="100.0000" Y="20.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="296.7538" Y="461.0114" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.5935" Y="0.7684" />
                    <PreSize X="0.0000" Y="0.0000" />
                    <OutlineColor A="255" R="255" G="0" B="0" />
                    <ShadowColor A="255" R="110" G="110" B="110" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="Text_guardValue" ActionTag="-228671762" Tag="81" IconVisible="False" LeftMargin="354.6627" RightMargin="45.3373" TopMargin="129.0452" BottomMargin="450.9548" IsCustomSize="True" FontSize="20" LabelText="300" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                    <Size X="100.0000" Y="20.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="404.6627" Y="460.9548" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.8093" Y="0.7683" />
                    <PreSize X="0.0000" Y="0.0000" />
                    <OutlineColor A="255" R="255" G="0" B="0" />
                    <ShadowColor A="255" R="110" G="110" B="110" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="Image_locationBg" ActionTag="-2097481132" Tag="84" IconVisible="False" LeftMargin="30.0983" RightMargin="90.9017" TopMargin="187.0587" BottomMargin="383.9413" Scale9Width="379" Scale9Height="29" ctype="ImageViewObjectData">
                    <Size X="379.0000" Y="29.0000" />
                    <Children>
                      <AbstractNodeData Name="Text_location" ActionTag="2135025318" Tag="85" IconVisible="False" HorizontalEdge="BothEdge" VerticalEdge="BothEdge" LeftMargin="6.8500" RightMargin="272.1500" TopMargin="-0.5000" BottomMargin="-0.5000" IsCustomSize="True" FontSize="22" LabelText="定 位" VerticalAlignmentType="VT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                        <Size X="100.0000" Y="30.0000" />
                        <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                        <Position X="56.8500" Y="14.5000" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="255" G="255" B="255" />
                        <PrePosition X="0.1500" Y="0.5000" />
                        <PreSize X="0.1042" Y="0.0469" />
                        <OutlineColor A="255" R="255" G="0" B="0" />
                        <ShadowColor A="255" R="110" G="110" B="110" />
                      </AbstractNodeData>
                    </Children>
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="219.5983" Y="398.4413" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.4392" Y="0.6641" />
                    <PreSize X="0.7580" Y="0.0483" />
                    <FileData Type="Normal" Path="heropresentationscene/hp_herobg.png" Plist="" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="Text_locationValue" ActionTag="-1766852379" Tag="86" IconVisible="False" HorizontalEdge="BothEdge" LeftMargin="35.0000" RightMargin="365.0000" TopMargin="227.1630" BottomMargin="352.8370" IsCustomSize="True" FontSize="20" LabelText="回复输出型" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                    <Size X="100.0000" Y="20.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="85.0000" Y="362.8370" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.1700" Y="0.6047" />
                    <PreSize X="0.0000" Y="0.0000" />
                    <OutlineColor A="255" R="255" G="0" B="0" />
                    <ShadowColor A="255" R="110" G="110" B="110" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="Image_destiny" ActionTag="-343619171" Tag="87" IconVisible="False" LeftMargin="29.5741" RightMargin="91.4259" TopMargin="256.6890" BottomMargin="314.3110" Scale9Width="379" Scale9Height="29" ctype="ImageViewObjectData">
                    <Size X="379.0000" Y="29.0000" />
                    <Children>
                      <AbstractNodeData Name="Text_destiny" ActionTag="2097161235" Tag="88" IconVisible="False" HorizontalEdge="BothEdge" VerticalEdge="BothEdge" LeftMargin="6.8500" RightMargin="272.1500" TopMargin="-0.5000" BottomMargin="-0.5000" IsCustomSize="True" FontSize="22" LabelText="宿 命" VerticalAlignmentType="VT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                        <Size X="100.0000" Y="30.0000" />
                        <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                        <Position X="56.8500" Y="14.5000" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="255" G="255" B="255" />
                        <PrePosition X="0.1500" Y="0.5000" />
                        <PreSize X="0.1042" Y="0.0469" />
                        <OutlineColor A="255" R="255" G="0" B="0" />
                        <ShadowColor A="255" R="110" G="110" B="110" />
                      </AbstractNodeData>
                    </Children>
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="219.0741" Y="328.8110" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.4381" Y="0.5480" />
                    <PreSize X="0.7580" Y="0.0483" />
                    <FileData Type="Normal" Path="heropresentationscene/hp_herobg.png" Plist="" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="Text_destiny_1" ActionTag="-546139779" Tag="89" IconVisible="False" HorizontalEdge="BothEdge" LeftMargin="35.0000" RightMargin="365.0000" TopMargin="295.0000" BottomMargin="285.0000" FontSize="20" LabelText="Text Label" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                    <Size X="100.0000" Y="20.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="85.0000" Y="295.0000" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.1700" Y="0.4917" />
                    <PreSize X="0.0000" Y="0.0000" />
                    <OutlineColor A="255" R="255" G="0" B="0" />
                    <ShadowColor A="255" R="110" G="110" B="110" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="Text_destiny_2" ActionTag="-801447520" Tag="90" IconVisible="False" HorizontalEdge="BothEdge" LeftMargin="35.0000" RightMargin="365.0000" TopMargin="325.0000" BottomMargin="255.0000" FontSize="20" LabelText="Text Label" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                    <Size X="100.0000" Y="20.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="85.0000" Y="265.0000" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.1700" Y="0.4417" />
                    <PreSize X="0.0000" Y="0.0000" />
                    <OutlineColor A="255" R="255" G="0" B="0" />
                    <ShadowColor A="255" R="110" G="110" B="110" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="Text_destiny_3" ActionTag="979786349" Tag="91" IconVisible="False" HorizontalEdge="BothEdge" LeftMargin="35.0000" RightMargin="365.0000" TopMargin="355.0000" BottomMargin="225.0000" FontSize="20" LabelText="Text Label" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                    <Size X="100.0000" Y="20.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="85.0000" Y="235.0000" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.1700" Y="0.3917" />
                    <PreSize X="0.0000" Y="0.0000" />
                    <OutlineColor A="255" R="255" G="0" B="0" />
                    <ShadowColor A="255" R="110" G="110" B="110" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="Text_destiny_4" ActionTag="-1110962840" Tag="92" IconVisible="False" HorizontalEdge="BothEdge" LeftMargin="35.0000" RightMargin="365.0000" TopMargin="385.0000" BottomMargin="195.0000" FontSize="20" LabelText="Text Label" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                    <Size X="100.0000" Y="20.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="85.0000" Y="205.0000" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.1700" Y="0.3417" />
                    <PreSize X="0.0000" Y="0.0000" />
                    <OutlineColor A="255" R="255" G="0" B="0" />
                    <ShadowColor A="255" R="110" G="110" B="110" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="Text_destiny_5" ActionTag="-892010017" Tag="93" IconVisible="False" HorizontalEdge="BothEdge" LeftMargin="35.0000" RightMargin="365.0000" TopMargin="415.0000" BottomMargin="165.0000" FontSize="20" LabelText="Text Label" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                    <Size X="100.0000" Y="20.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="85.0000" Y="175.0000" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.1700" Y="0.2917" />
                    <PreSize X="0.0000" Y="0.0000" />
                    <OutlineColor A="255" R="255" G="0" B="0" />
                    <ShadowColor A="255" R="110" G="110" B="110" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="Text_destiny_6" ActionTag="-66804054" Tag="94" IconVisible="False" HorizontalEdge="BothEdge" LeftMargin="35.0000" RightMargin="365.0000" TopMargin="445.0000" BottomMargin="135.0000" FontSize="20" LabelText="Text Label" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                    <Size X="100.0000" Y="20.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="85.0000" Y="145.0000" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.1700" Y="0.2417" />
                    <PreSize X="0.0000" Y="0.0000" />
                    <OutlineColor A="255" R="255" G="0" B="0" />
                    <ShadowColor A="255" R="110" G="110" B="110" />
                  </AbstractNodeData>
                </Children>
                <AnchorPoint ScaleX="1.0000" ScaleY="0.5000" />
                <Position X="850.0000" Y="300.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="1.0000" Y="0.5000" />
                <PreSize X="0.5882" Y="1.0000" />
                <SingleColor A="255" R="255" G="150" B="100" />
                <FirstColor A="255" R="255" G="150" B="100" />
                <EndColor A="255" R="255" G="255" B="255" />
                <ColorVector ScaleY="1.0000" />
                <InnerNodeSize Width="500" Height="600" />
              </AbstractNodeData>
            </Children>
            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
            <Position X="480.0000" Y="320.0000" />
            <Scale ScaleX="1.0000" ScaleY="1.0000" />
            <CColor A="255" R="255" G="255" B="255" />
            <PrePosition X="0.5000" Y="0.5000" />
            <PreSize X="0.8854" Y="0.9375" />
            <SingleColor A="255" R="150" G="200" B="255" />
            <FirstColor A="255" R="150" G="200" B="255" />
            <EndColor A="255" R="255" G="255" B="255" />
            <ColorVector ScaleY="1.0000" />
          </AbstractNodeData>
          <AbstractNodeData Name="Button_left" ActionTag="1557245935" Tag="147" IconVisible="False" HorizontalEdge="BothEdge" VerticalEdge="BothEdge" LeftMargin="20.9000" RightMargin="904.1000" TopMargin="292.0000" BottomMargin="292.0000" TouchEnable="True" FontSize="14" Scale9Enable="True" LeftEage="11" RightEage="11" TopEage="11" BottomEage="11" Scale9OriginX="11" Scale9OriginY="11" Scale9Width="13" Scale9Height="34" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="ButtonObjectData">
            <Size X="35.0000" Y="56.0000" />
            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
            <Position X="38.4000" Y="320.0000" />
            <Scale ScaleX="1.0000" ScaleY="1.0000" />
            <CColor A="255" R="255" G="255" B="255" />
            <PrePosition X="0.0400" Y="0.5000" />
            <PreSize X="0.0365" Y="0.0875" />
            <TextColor A="255" R="65" G="65" B="70" />
            <DisabledFileData Type="Default" Path="Default/Button_Disable.png" Plist="" />
            <NormalFileData Type="Normal" Path="heropresentationscene/hp_leftbtn.png" Plist="" />
            <OutlineColor A="255" R="255" G="0" B="0" />
            <ShadowColor A="255" R="110" G="110" B="110" />
          </AbstractNodeData>
          <AbstractNodeData Name="Button_right" ActionTag="-1541050937" Tag="148" IconVisible="False" HorizontalEdge="BothEdge" VerticalEdge="BothEdge" LeftMargin="904.6000" RightMargin="21.4000" TopMargin="291.0000" BottomMargin="291.0000" TouchEnable="True" FontSize="14" Scale9Enable="True" LeftEage="11" RightEage="11" TopEage="11" BottomEage="11" Scale9OriginX="11" Scale9OriginY="11" Scale9Width="12" Scale9Height="36" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="ButtonObjectData">
            <Size X="34.0000" Y="58.0000" />
            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
            <Position X="921.6000" Y="320.0000" />
            <Scale ScaleX="1.0000" ScaleY="1.0000" />
            <CColor A="255" R="255" G="255" B="255" />
            <PrePosition X="0.9600" Y="0.5000" />
            <PreSize X="0.0354" Y="0.0906" />
            <TextColor A="255" R="65" G="65" B="70" />
            <DisabledFileData Type="Default" Path="Default/Button_Disable.png" Plist="" />
            <NormalFileData Type="Normal" Path="heropresentationscene/hp_rightbtn.png" Plist="" />
            <OutlineColor A="255" R="255" G="0" B="0" />
            <ShadowColor A="255" R="110" G="110" B="110" />
          </AbstractNodeData>
        </Children>
      </ObjectData>
    </Content>
  </Content>
</GameProjectFile>